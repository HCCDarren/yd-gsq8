import { GsheetDoPostFilter } from './../models/gsheet-do-post-filter.model';

export interface GsheetDoPostFilterDto {
  command: string; // 'filter'
  outpufColumns: string[],    // ['A', 'B:C', 'AB']
  filters?: GsheetDoPostFilter[];
  columnRange?: string,        // 'A:Z'
  rowRange?: string,           // "2:10",
  spreadsheedId?: string,
  sheetName?: string,
}


