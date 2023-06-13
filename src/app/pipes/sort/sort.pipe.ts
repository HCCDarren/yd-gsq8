import { Pipe, PipeTransform } from '@angular/core';
import { GsqMetaColumn } from 'src/app/services/gsq-data/models/gsq-meta-column';
import { GsqFormControlEnum } from 'src/app/services/gsq-data/enums/gsq-form-control.enum';

@Pipe({
  name: 'sort',
  // use pure pipe, change detection when array identity changes
  // will not work for push or pop item from array
  pure: true,
})
export class SortPipe implements PipeTransform {
  transform(rows: any[], sortColumns: GsqMetaColumn[]): any[] {
    return this.sortRows(rows,sortColumns );
  }

  sortRows(rows: any[], sortColumns: GsqMetaColumn[]): any[] {
    if (!Array.isArray(rows)) return;
    rows.sort((a: any, b: any) => {
      return this.compareRows(a, b, sortColumns);
    });
    return rows;
  }

  private compareRows(a: any, b: any, columns: GsqMetaColumn[]): number {
    if (columns.length === 0) return 0;
    const direction = (columns[0].formControl &&  columns[0].formControl === GsqFormControlEnum.desc) ? -1 : 1;
    if (a[columns[0].num] < b[columns[0].num]) {
      return -1 * direction;
    } else if (a[columns[0].num] > b[columns[0].num]) {
      return 1 * direction;
    } else {
      this.compareRows(a, b, columns.slice(1));
    }
  }
}
