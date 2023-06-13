import { TestBed } from '@angular/core/testing';

import { GoogleSheetsApiService } from './google-sheets-api.service';

describe('GoogleSheetsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleSheetsApiService = TestBed.get(GoogleSheetsApiService);
    expect(service).toBeTruthy();
  });
});
