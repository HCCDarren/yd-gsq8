import { GsqSheet } from './../../services/gsq-data/models/gsq-sheet';
import { GsqDataService } from './../../services/gsq-data/gsq-data.service';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gsq-management-page',
  templateUrl: './gsq-management-page.component.html',
  styleUrls: ['./gsq-management-page.component.scss']
})
export class GsqManagementPageComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  sheetsId: string = null;
  title: string = null;
  sheets: GsqSheet[] = [];

  constructor(
    private gsqData: GsqDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // get params and query params from url
    // tslint:disable-next-line: no-string-literal
    this.sheetsId = this.route.snapshot.params['id'];  // + for convert to a number
    if (this.route.snapshot.queryParams) {
      this.title = this.route.snapshot.queryParams.title;
    }
    this.init();

    // get params and query params if url changes
    combineLatest(this.route.params, this.route.queryParams)
      .pipe(map(results => ({ params: results[0], queryParams: results[1] })))
      .subscribe(results => {
        this.sheetsId = results.params['id'] + '';  // + for convert to a number
        if (results.queryParams) {
          this.title = results.queryParams.title;
        }
        this.init();
      });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init() {
    const nowMoment = moment();
    this.gsqData.getSheets(this.sheetsId, environment.managemantSettingRange).pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(sheets => {
        this.sheets = sheets.filter(sheet => {
          const startTimeOk = !sheet.startTime || sheet.startTime && moment(sheet.startTime).isBefore(nowMoment);
          const endTimeOk = !sheet.endTime || sheet.endTime && moment(sheet.endTime).isAfter(nowMoment);
          return startTimeOk && endTimeOk;
        });
      });
  }
}
