// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get?apix_params=%7B%22spreadsheetId%22%3A%221pU0ySaPQ1L3MrqfQZG-cqibnNzMRm_RXl0pVd-OCxsQ%22%2C%22range%22%3A%22%E6%A0%A1%E8%BB%8A_data%22%2C%22dateTimeRenderOption%22%3A%22FORMATTED_STRING%22%2C%22majorDimension%22%3A%22ROWS%22%2C%22valueRenderOption%22%3A%22UNFORMATTED_VALUE%22%2C%22fields%22%3A%22values%22%7D
// https://app.quicktype.io/

// quota status https://console.cloud.google.com/iam-admin/quotas?project=yd-web-2019&folder&organizationId&service=sheets.googleapis.com
// quota https://console.developers.google.com/apis/api/sheets.googleapis.com/quotas?folder=&organizationId=&project=yd-web-2019&duration=P30D
// Quota Name	Limit
// Read requests per 100 seconds	500
// Read requests per 100 seconds per user	100
// Read requests per day	Unlimited
// Write requests per 100 seconds	500
// Write requests per 100 seconds per user	100
// Write requests per day	Unlimited

// rest reference https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
// client library reference https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SheetsRangeValues } from './models/google-sheets-range-value.model';

const API_KEY = environment.credential.apiKey;
const API_BASE_URL = 'https://sheets.googleapis.com/v4';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsApiService {

  constructor(
    private http: HttpClient,
  ) { }


  // get range values from google sheets, using google spreadsheets.values.get rest call
  getSheetsRangeValues(sheetsId: string, range: string): Observable<SheetsRangeValues> {
    const url = API_BASE_URL
      + '/spreadsheets/' + sheetsId
      + '/values/' + range
      + '?key=' + API_KEY
      + '&dateTimeRenderOption=FORMATTED_STRING'
      + '&majorDimension=ROWS'
      + '&valueRenderOption=UNFORMATTED_VALUE'
      + '&fields=values'; //'&fields=range,values';
    return this.http.get<SheetsRangeValues>(url).pipe(
      catchError(err => {
        console.error('YD Error in GoogleSheetsApiService.getSheetsRangeValues:', err.message);
        return of(null);
      })
    );
  }
}

