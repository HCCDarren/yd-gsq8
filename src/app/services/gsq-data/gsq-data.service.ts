import { query } from '@angular/animations';
import { GsqPageSetting } from './models/gsq-page-setting.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { config, Observable, of } from 'rxjs';
import { concatMap, map, observeOn, switchMap, toArray } from 'rxjs/operators';
import { enumToArray } from 'src/app/shared/utilities/utilities';
import { environment } from 'src/environments/environment';
import { GoogleSheetsApiService } from '../google-sheets-api/google-sheets-api.service';
import { GsqFormControlEnum } from './enums/gsq-form-control.enum';
import { GsqInputTypeEnum } from './enums/gsq-input-type.enum';
import { GsqMetaColumn } from './models/gsq-meta-column';
import { GsqSheet } from './models/gsq-sheet';
import { GsqSheetConfig } from './models/gsq-sheet-config';



@Injectable({
  providedIn: 'root'
})
export class GsqDataService {

  constructor(
    private sheetsApiService: GoogleSheetsApiService,
  ) { }

  // get an sheets array
  getSheets(spreadSheetId: string, queriesSettingRange: string): Observable<GsqSheet[]> {
    return this.getSheetConfigs(spreadSheetId, queriesSettingRange).pipe(
      switchMap(sheetConfigs => {
        return sheetConfigs;
      }),
      concatMap(sheetConfig => {
        if (sheetConfig.dataRange) {
          return this.getSheet(spreadSheetId, sheetConfig);
        } else {
          const sheet: GsqSheet = {
            spreadsheetId: spreadSheetId,
            queriesSettingRange: queriesSettingRange,
            queryName: sheetConfig.queryName,
            description: sheetConfig.description,
            startTime: sheetConfig.startTime,
            endTime: sheetConfig.endTime,
          };
          return of(sheet);
        }

      }),
      toArray()
    );
  }


  getSheetConfigs(spreadsheetId: string, settingRange: string): Observable<GsqSheetConfig[]> {
    return this.sheetsApiService.getSheetsRangeValues(spreadsheetId, settingRange).pipe(
      map(settings => {
        const data = settings.values.splice(1);
        let result = data.map(row => {
          const a = moment();
          const description = row[6] + '';
          const startTime = moment(new Date(row[7] + ''));
          const endTime = moment(new Date(row[8] + ''));
          return {
            spreadsheetId: spreadsheetId,
            queriesSettingRange: settingRange,
            queryOrder: +row[0],       // force as number
            queryName: row[1] + '',    // force as string
            dataRange: row[2] + '',
            sortColumnsStr: row[3] + '',
            keyColumnsStr: row[4] + '',
            valueColumnsStr: row[5] + '',
            description: description && description.length > 0 ? description : null,
            startTime: startTime.isValid() ? startTime.format('YYYY-MM-DDTHH:mm:ssZ') : null,
            endTime: endTime.isValid() ? endTime.format('YYYY-MM-DDTHH:mm:ssZ') : null,
          } as GsqSheetConfig;
        });
        result = result.filter(r => r.dataRange || r.description);
        return result;
      })
    );
  }


  getSheet(spreadsheetId: string, sheetConfig: GsqSheetConfig): Observable<GsqSheet> {
    return this.sheetsApiService.getSheetsRangeValues(spreadsheetId, sheetConfig.dataRange).pipe(
      map(sheetValues => {
        // in columnNames and values, add at the beginning a unique index with _index col name
        const columnNames = sheetValues.values[0].map(name => name + '');
        columnNames.unshift('_index');
        const values = sheetValues.values.slice(1).map((row, index) => {
          row.unshift(index);
          return row;
        });

        // compute keyColumns and keyOptions
        const keyColumns = this.extractColumns(sheetConfig.keyColumnsStr);
        const keyOptions = keyColumns.map(col => {
          return this.extractKeyOptions(col, values);
        });

        // const keyColumns = this.extractColumnsOld(sheetConfig.keyColumnsStr);   // ['2','3']
        // const keyOptions = keyColumns.map(col => {
        //   const options = [...new Set(values.map(row => { return row[col] }))];   // [1081]
        //   options.unshift('無')
        //   return options;
        // })
        const sheet: GsqSheet = {
          spreadsheetId: sheetConfig.spreadsheetId,
          queriesSettingRange: sheetConfig.queriesSettingRange,
          queryName: sheetConfig.queryName,
          description: sheetConfig.description,
          startTime: sheetConfig.startTime,
          endTime: sheetConfig.endTime,
          queryOrder: sheetConfig.queryOrder,
          columnNames,
          data: values,
          sortColumns: this.extractColumns(sheetConfig.sortColumnsStr),
          keyColumns,
          keyOptions, // [['1081'],['八德國中','大成國中']],
          valueColumns: this.extractColumns(sheetConfig.valueColumnsStr),

        };
        return sheet;
      })
    );
  }

  //  convert columnsValue (ex:'1-3, 3-4, 6') to colums (ex: [1,2,3,4,6])
  extractColumnsOld(columnsStr: string): string[] {
    const columns: string[] = [];
    // from '1-3, 3-4', compute [{start:1, end:3}, {start:3, end:4}]
    const startEndPairs = columnsStr.split(',').map(set => {
      const pair = set.split('-')
        .map(column => {
          return +(column.trim());
        });
      return { start: pair[0], end: pair[1] ? pair[1] : pair[0] };
    });
    // add unique columns to columns array
    // from [{start:1, end:3}, {start:3, end:4}], compute ['1','2','3','4']
    startEndPairs.forEach(pair => {
      for (let index = pair.start; index <= pair.end; index++) {
        const indexStr = index + '';
        if (columns.indexOf(indexStr) == -1) {
          columns.push(indexStr);
        }
      }
    });
    return columns;
  }

  //  convert columnsValue (ex:'1-3, 3-4:input:password, 6:select')
  //  to [ { num: 1, formControl: null, inputType: null }, { num: 2, formControl: null, inputType: null }, { num: 3, formControl: null, inputType: null }, { num: 4, formControl: 'input', inputType: 'password' }, { num: 6, formControl: 'select', inputType: null} ]
  extractColumns(columnsStr: string): GsqMetaColumn[] {
    const columns: GsqMetaColumn[] = [];
    // convert {'1-3, 3-4:input:password, 6:select'} to
    // [
    //   { start: 1, end: 3 controlType: null, inputType: null},
    //   { start: 3, end: 4, controlType: 'input', inputType: 'password' },
    //   { start: 6, end: 6, controlType: 'select' , inputType: null}
    // ]
    const columnsRange = columnsStr.toLowerCase().split(',').map(set => {
      const data = set.split(':');
      const columnRangeStr = data[0];
      const formControl = (data[1] ? data[1].trim() : null) as GsqFormControlEnum;
      if (formControl && !(formControl in GsqFormControlEnum)) {
        console.warn('Warning in GsqDataService.extractColumns:', '<' + columnsStr + ">'s " + formControl + ' might not be a valid form control. Valid Controls are ' + enumToArray(GsqFormControlEnum).join(', '));
      }
      const inputType = (data[2] ? data[2].trim() : null) as GsqInputTypeEnum;
      if (inputType && !(inputType in GsqInputTypeEnum)) {
        console.warn('Warning in GsqDataService.extractColumns:', '<' + columnsStr + ">'s " + inputType + ' might not be a valid input type.. Valid input types are ' + enumToArray(GsqInputTypeEnum).join(', '));
      }
      const columnRange = columnRangeStr.split('-')
        .map(column => {
          return +(column.trim());
        });
      return {
        start: columnRange[0],
        end: columnRange[1] ? columnRange[1] : columnRange[0],
        formControl,
        inputType,
      };
    });

    // add unique columns to columns array
    // convert [
    //   { start: 1, end: 3 controlType: null, inputType: null},
    //   { start: 3, end: 4, controlType: 'input', inputType: 'password' },
    //   { start: 6, end: 6, controlType: 'select' , inputType: null}
    // ]
    // to [ { num: 1, formControl: null, inputType: null }, { num: 2, formControl: null, inputType: null }, { num: 3, formControl: null, inputType: null }, { num: 4, formControl: 'input', inputType: 'password' }, { num: 6, formControl: 'select', inputType: null} ]
    columnsRange.forEach(set => {
      for (let num = set.start; num <= set.end; num++) {
        if (columns.findIndex((column) => {
          return column.num === num;
        }) === -1) {
          // if not found, push into result arrau
          columns.push({
            num,
            formControl: set.formControl,
            inputType: set.inputType
          });
        }
      }
    });
    return columns;
  }

  extractKeyOptions(col: GsqMetaColumn, values: (number | string)[][]): (number | string)[] {
    const options = [...new Set(values.map(row => row[col.num]))];   // [1081]
    options.unshift('無');
    return options;
  }


  // filter rows base on keyColumns 比對欄 and keyValues data
  filterRows(rows: (number | string)[][], keyColumns: GsqMetaColumn[], keyValues: (number | string)[]): any {
    if (!Array.isArray(rows)) { return; }
    const result = rows.filter(row => {
      return this.rowMatches(row, keyColumns, keyValues);
    });
    return result;
  }

  private rowMatches(row: (number | string)[], keyColumns: GsqMetaColumn[], keyValues: (number | string)[]) {
    if (keyColumns.length === 0 || keyValues.length === 0) { return true; }

    const value = row[keyColumns[0].num];     // 值
    const valueStr = value ? value + '' : '';     // 值Str
    const keyValue = keyValues[0];            // 比對值
    const isCheckbox = (keyColumns[0].formControl === GsqFormControlEnum.checkbox);
    const checkboxValueStr = keyColumns[0].inputType ? keyColumns[0].inputType + '' : '';  // checkbox 的 比對值Str

    const isNotCheckboxAndEqualToKeyValue = !isCheckbox && value === keyValue;
    const isCheckedAndEqualToCheckboxValue_Or_IsNotCheckedAndNotEqualCheckboxValue =
      isCheckbox && ((keyValue && valueStr === checkboxValueStr) || (!keyValue && valueStr !== checkboxValueStr));

    if (isNotCheckboxAndEqualToKeyValue || isCheckedAndEqualToCheckboxValue_Or_IsNotCheckedAndNotEqualCheckboxValue) {
      return this.rowMatches(row, keyColumns.slice(1), keyValues.slice(1));
    } else {
      return false;
    }
  }

  private getPageConfigValue(label: string, data: string[][]) {
    const results = data.filter(row => row[0] === label);
    if (results.length >= 1) {
      return results[0][1];
    }
  }

  // //#region sheets's A1 notation to index  conversion
  // // https://codereview.stackexchange.com/questions/90112/a1notation-conversion-to-row-column-index

  // private cellA1ToIndex(cellA1) {
  //   var match = cellA1.match(/^\$?([A-Z]+)\$?(\d+)$/);
  //   if (!match) throw new Error("Invalid cell reference");
  //   return {
  //     row: this.rowA1ToIndex(match[2]),
  //     col: this.colA1ToIndex(match[1])
  //   };
  // }

  // private colA1ToIndex(colA1) {
  //   var i, l, chr,
  //     sum = 0,
  //     A = "A".charCodeAt(0),
  //     radix = "Z".charCodeAt(0) - A + 1;
  //   if (typeof colA1 !== 'string' || !/^[A-Z]+$/.test(colA1)) throw new Error("Expected column label");
  //   for (i = 0, l = colA1.length; i < l; i++) {
  //     chr = colA1.charCodeAt(i);
  //     sum = sum * radix + chr - A + 1
  //   }
  //   return sum;
  // }

  // private rowA1ToIndex(rowA1) {
  //   var index = parseInt(rowA1, 10)
  //   if (isNaN(index)) throw new Error("Expected row number");
  //   return index;
  // }
  // //#endregion



}
