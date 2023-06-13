import { environment } from 'src/environments/environment';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GsqDataService } from 'src/app/services/gsq-data/gsq-data.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, concatMap, switchMap, mergeMap, flatMap, scan } from 'rxjs/operators';
import { GsqSheet } from 'src/app/services/gsq-data/models/gsq-sheet';

@Component({
  selector: 'app-bls-main-page',
  templateUrl: './bls-main-page.component.html',
  styleUrls: ['./bls-main-page.component.scss']
})
export class BlsMainPageComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  sheets: GsqSheet[] = [];
  sheet: GsqSheet = null;
  keyValues: (number | string)[] = null;

  constructor(
    private gsqData: GsqDataService,
  ) { }

  ngOnInit() {
    const sheetsId = '1pU0ySaPQ1L3MrqfQZG-cqibnNzMRm_RXl0pVd-OCxsQ';

    this.gsqData.getSheets(sheetsId, environment.defaultQueriesSettingRange).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(sheets => {
        this.sheets = sheets;
        this.sheet = sheets.filter(sh => sh.queryName === '校車查詢')[0];
      })
    // this.sheet.keyOptions[0][i]
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onQuerySubmit(keyValue: (number | string)[]) {
    this.keyValues = keyValue;
  }
}
