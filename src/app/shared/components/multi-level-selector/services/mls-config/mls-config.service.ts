import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MlsConfig } from '../../models/mls-config.model';

@Injectable({
  providedIn: 'root'
})
export class MlsConfigService {

  constructor(
  ) { }

  getMlsConfig(): Observable<MlsConfig> {
    return of(null);
  }
}
