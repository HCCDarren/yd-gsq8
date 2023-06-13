import { GsheetDoPostFilterType } from './../enums/gsheet-do-post-filter-type.enum';

export interface GsheetDoPostFilter {
  column: string;
  type: GsheetDoPostFilterType;
  filterValue: (string|number|boolean|Date);
}


