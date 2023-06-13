

export interface GsheetDoPostPasteValues {
  column: string,   // 'A'
  row?: number,
  values: (string | number | boolean | Date)[][],
}

