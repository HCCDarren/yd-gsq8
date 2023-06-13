export interface GsqSheetConfig {
  spreadsheetId: string;
  queriesSettingRange: string;
  queryOrder: number;
  queryName: string;
  dataRange: string;
  sortColumnsStr: string;
  keyColumnsStr: string;
  valueColumnsStr: string;
  description: string;
  startTime?: string;
  endTime?: string;
}
