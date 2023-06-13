import { GsqMetaColumn } from './gsq-meta-column';

export interface GsqSheet {
  spreadsheetId: string;
  queriesSettingRange: string;  //
  queryName: string;
  queryOrder?: number;
  sortColumns?: GsqMetaColumn[];   //  [{ num: 1, formControl: 'desc'}, {num:3}]
  // tslint:disable-next-line: max-line-length
  keyColumns?: GsqMetaColumn[];    //  [ { num: 1, formControl: null, inputType: null }, { num: 2, formControl: null, inputType: null }, { num: 3, formControl: null, inputType: null }, { num: 4, formControl: 'input', inputType: 'password' }, { num: 6, formControl: 'select', inputType: null} ]
  valueColumns?: GsqMetaColumn[];  //  [ {num: 4},{num: 4}, {num: 4} ]
  columnNames?: string[];  //  ['_index' ,序號	學期	國中	站名	路線	早上上車時間	一學期來回票價]
  keyOptions?: (number | string)[][];  //   [[1081],['','']]
  data?: (number | string)[][]; // Array<Array<number | string>>,
  description?: string;
  startTime?: string;
  endTime?: string;
}
