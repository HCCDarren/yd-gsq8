import { GsqButtonList } from './../../services/gsq-data/models/gsq-button-list.model';
import { CipherService as EncryptionService } from '../../services/cipher/cipher.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { GsqDataService } from 'src/app/services/gsq-data/gsq-data.service';
import { GsqSheet } from 'src/app/services/gsq-data/models/gsq-sheet';
import { environment } from 'src/environments/environment';
import { ElementFinder } from 'protractor';

const V2_URL_SEGMENT = environment.V2UrlSegment;
const DEFAULT_QUERIES_SETTING_RANGE = environment.defaultQueriesSettingRange;

@Component({
  selector: 'app-gsq-page',
  templateUrl: './gsq-page.component.html',
  styleUrls: ['./gsq-page.component.scss']
})
export class GsqPageComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject<void>();  // using Best Practice For Unsubscribing

  spreadsheetId: string = null;
  errMsg: string = null;
  queriesSettingRange: string = null;   // Spreadsheet 命名，用來取得查詢頁設定

  title: string = null;   // 查詢頁標題
  description: string = null;  // 查詢頁說明
  queryButtonLabel: string = null;   // 查詢頁submit 按鈕文字

  buttonList: GsqButtonList = null;

  sheets: GsqSheet[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encryptionService: EncryptionService,
    private gsqDataService: GsqDataService,
  ) { }

  ngOnInit() {
    // get params and query params from url
    // tslint:disable-next-line: no-string-literal
    const url = this.router.url;
    const params = this.route.snapshot.params;
    const queryParams = this.route.snapshot.queryParams;
    this.init(url, params, queryParams);
    this.getQueriesSetting(this.spreadsheetId, this.queriesSettingRange);

    // get params and query params if url changes
    combineLatest(
      this.route.params,
      this.route.queryParams).pipe(map(urlResults => ({
        params: urlResults[0],
        queryParams: urlResults[1],
      })),
        takeUntil(this.ngUnsubscribe)).subscribe(urlResult => {
          const params = urlResult.params;
          const queryParams = urlResult.queryParams;
          this.init(url, params, queryParams);
          this.getQueriesSetting(this.spreadsheetId, this.queriesSettingRange);
        });
  }

  ngOnDestroy(): void {
    // using Best Practice For Unsubscribing
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * 確定 v2 route 的 spreadsheet id 有加密，
   * 取得 查詢群設定命名，
   * 設定 errMsg 如果 spreadsheet id 有問題
   */
  init(url: string, params, queryParams) {
    // 確定 v2 route 的 spreadsheet id 有加密
    const segment0 = url.split('/')[1];
    if (segment0.toLocaleLowerCase() === V2_URL_SEGMENT.toLocaleLowerCase()) {
      this.spreadsheetId = this.encryptionService.decrypt(params['id'] + '');
    } else {
      this.spreadsheetId = params['id'] + '';
    }
    // 取得 url 上的 查詢群設定命名
    this.queriesSettingRange = this.getQuerySettingRange(queryParams);

    if (!this.spreadsheetId) {
      this.errMsg = 'Id 有問題'
    }
  }


  /**
 * 取得 查詢群設定
 *
 */
  private getQueriesSetting(spreadsheetId: string, queriesSettingRange: string) {
    if (this.spreadsheetId) {
      // get 查詢群設定
      const nowMoment = moment();
      this.gsqDataService.getSheets(spreadsheetId, queriesSettingRange).pipe(   // EN查詢1
        takeUntil(this.ngUnsubscribe)).subscribe(sheets => {
          this.sheets = sheets.filter(sheet => {
            const startTimeOk = !sheet.startTime || sheet.startTime && moment(sheet.startTime).isBefore(nowMoment);
            const endTimeOk = !sheet.endTime || sheet.endTime && moment(sheet.endTime).isAfter(nowMoment);
            return startTimeOk && endTimeOk;
          });
        });
    }

  }


  /**
   * get querySettingRange from queryParams
   *
   * @private
   * @param {*} queryParams
   * @return {*}  {string}
   * @memberof GsqPageComponent
   */
  private getQuerySettingRange(queryParams): string {
    // 取得 url 上的 查詢群設定命名
    const queriesSettingRange = queryParams[environment.QueryParamLabelForQueriesSettingRange];
    if (queriesSettingRange) {
      return queriesSettingRange + '';
    } else {
      return DEFAULT_QUERIES_SETTING_RANGE;
    }
  }
}
