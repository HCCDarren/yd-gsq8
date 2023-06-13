import { Pipe, PipeTransform } from '@angular/core';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { GsqMetaColumn } from 'src/app/services/gsq-data/models/gsq-meta-column';
import { GsqDataService } from 'src/app/services/gsq-data/gsq-data.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(
    private gsqDataService: GsqDataService,
  ) {}
  transform(rows: (number | string)[][], keyColumns: GsqMetaColumn[], keyValues: (number | string)[]): any {
    return this.gsqDataService.filterRows(rows, keyColumns, keyValues);
  }


}
