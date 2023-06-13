import { TestBed } from '@angular/core/testing';

import { GsqDataService } from './gsq-data.service';

describe('gsqDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GsqDataService = TestBed.get(GsqDataService);
    expect(service).toBeTruthy();
  });
});
