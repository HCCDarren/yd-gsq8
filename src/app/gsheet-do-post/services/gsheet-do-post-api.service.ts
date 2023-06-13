import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GsheetDoPostPasteDto } from './../dtos/gsheet-do-post-paste.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GsheetDoPostFilterDto } from '../dtos/gsheet-do-post-filter.dto';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
};

@Injectable({
  providedIn: 'root'
})
export class GsheetDoPostApiService {

  constructor(
    private http: HttpClient,
  ) { }


  /**
   * call app script's doPost() event for spreadsheet range manipulation
   *
   *  for example app script doPost, see https://script.google.com/home/projects/1mUIxjsP6WuOS1OotLEfJiqIGUXHuqYpeDexhHJrgoYapPvZmZjQ-5Oje/edit
   *
   * @param {string} urlstring: url for the app scritp's doPost()
   * @param {*} data  : data pass by body of post
   * @return {*}  {Observable<any>}
   * @memberof GoogleAppScriptApiService
   */
  doPost(
    urlstring: string,
    data: (GsheetDoPostPasteDto | GsheetDoPostFilterDto)
  ): Observable<any> {
    return this.http.post<any>(urlstring, data, HTTP_OPTIONS).pipe(
      catchError(err => {
        console.error('YD Error in GoogleAppScriptApiService.doPost:', err.message);
        return of(null);  // TODO need to pass error back and show user
      })
    );
  }

}
