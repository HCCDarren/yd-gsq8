import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GsqDataService } from 'src/app/services/gsq-data/gsq-data.service';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { GsqSheet } from '../gsq-data/models/gsq-sheet';
import { GsheetDoPostPasteDto } from '../../gsheet-do-post/dtos/gsheet-do-post-paste.dto';
import { GsheetDoPostApiService } from '../../gsheet-do-post/services/gsheet-do-post-api.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

// const DO_POST_URL =  // yd-gsq log
//   'https://script.google.com/macros/s/AKfycbz8HRL7YoO-4PwENQplEsOs1eQkvD3fcWPUgL_Wbw7QGLBoghsRvAMQKwWfZuYFX3QJ2A/exec';

// url from app script project yd-do-post-paste-filter
// see https://script.google.com/home/projects/1WQ_EDeegcqb3Ecw6h6BJQgdktlvD8q4WJb0AuwwYQEvlSLeyiXbtqg9J/edit
const DO_POST_URL =     // yd-share
  'https://script.google.com/macros/s/AKfycbxSU5gSi_xm4a791CueI0n1W4BKeoROBcE5SSZLlhaeccJgs17BiwiLYBr05EXSOqJlig/exec';
const LOG_SHEET_ID = '197aUAOOKsYPzLTtNrGme_ZQi4xd1sgNJ82m0H-0bHbw';
const LOG_SHEET_NAME = 'yd-gsq log';
const LOG_MAX_KEY_VALUE_COL = 10;
const LOG_MAX_RESULT_COL = 10;

@Injectable({
  providedIn: 'root'
})
export class GsqLogService {

  filterPipe: FilterPipe;
  sortPipe: SortPipe;

  constructor(
    private gsqDataService: GsqDataService,
    private gsheetDoPostApi: GsheetDoPostApiService,
    private route: ActivatedRoute,
  ) {
    this.filterPipe = new FilterPipe(this.gsqDataService);
    this.sortPipe = new SortPipe();
  }

  gsqLog(sheet: GsqSheet, keyValues: (number | string)[]) {
    if (this.useLog()) {
      const resultData = this.extractResultData(sheet, keyValues);

      if (resultData && resultData.length > 0) {
        const pastData: GsheetDoPostPasteDto = {
          "spreadsheedId": LOG_SHEET_ID,
          "sheetName": LOG_SHEET_NAME,
          "command": "paste",
          "pastesValues": [
            {
              "column": "B",
              "values": this.createPastesValues(sheet, keyValues, resultData),
            },
          ]
        }
        return this.gsheetDoPostApi.doPost(
          DO_POST_URL,
          pastData,
        ).pipe(
          tap(() => { console.info('gsqLogged') })
        )
      }
    }
    return of(null);


  }

  private extractResultData(sheet: GsqSheet, keyValues: (number | string)[]) {
    const filteredData = this.filterPipe.transform(sheet.data, sheet.keyColumns, keyValues);
    const sortedData = this.sortPipe.transform(filteredData, sheet.sortColumns);


    const resultData: (number | string)[][] = [];
    sortedData.map(row => {
      const rowResult: (number | string)[] = [];
      sheet.valueColumns.map(col => {
        rowResult.push(row[col.num]);
      })
      resultData.push(rowResult);
    })
    return resultData;
  }

  private createPastesValues(
    sheet: GsqSheet,
    keyValues: (number | string)[],
    result: (number | string)[][]): (string | number | boolean | Date)[][] {
    const pasteValues: (string | number | boolean | Date)[][] = result.map((row, index) => {
      const rowData: (number | string | boolean | Date)[] = [];
      rowData.push('Gsq查詢');
      rowData.push(sheet.spreadsheetId);
      rowData.push(sheet.queriesSettingRange);
      rowData.push(sheet.queryOrder);
      rowData.push(sheet.queryName);
      rowData.push(index + 1);
      for (let i = 0; i < LOG_MAX_KEY_VALUE_COL; i++) {
        if (i < keyValues.length) {
          rowData.push(keyValues[i])
        } else {
          rowData.push(null)
        }
      }
      for (let i = 0; i < LOG_MAX_RESULT_COL; i++) {
        if (i < row.length) {
          rowData.push(row[i])
        } else {
          rowData.push(null)
        }
      }
      return rowData;
    })
    return pasteValues
  }

  private useLog(): boolean {
    const queryParams = this.route.snapshot.queryParams;
    const logQueryParam = queryParams[environment.QueryParamLabelForLog];
    const useLog = logQueryParam && !(('' + logQueryParam).toLocaleLowerCase() === 'false' || (+logQueryParam <= 0));
    return useLog;
  }
}
