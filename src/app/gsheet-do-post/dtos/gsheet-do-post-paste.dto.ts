import { GsheetDoPostPasteValues } from './../models/gsheet-do-post-column-value.model';

export interface GsheetDoPostPasteDto {
  command: string; // 'paste'
  pastesValues: GsheetDoPostPasteValues[],
  spreadsheedId?: string,
  sheetName?: string,
}


