import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GsqLogService } from '../../services/gsq-log/gsq-log.service';
import { Component, OnInit, Input } from '@angular/core';
import { GsqSheet } from 'src/app/services/gsq-data/models/gsq-sheet';

@Component({
  selector: 'app-gsq-sheet',
  templateUrl: './gsq-sheet.component.html',
  styleUrls: ['./gsq-sheet.component.scss']
})
export class GsqSheetComponent implements OnInit {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing


  @Input() sheet: GsqSheet;
  @Input() buttonLabel: string;

  keyValues: (number | string)[];

  constructor(
    private gsheetLogService: GsqLogService,
  ) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  onQuerySubmit(keyValues: (number | string)[]) {
    this.keyValues = keyValues;

    if (this.keyValues) {
      this.gsheetLogService.gsqLog(this.sheet, keyValues).pipe(
        takeUntil(this.ngUnsubscribe)).subscribe(() => {});
    }
  }
}
