import { TestBed } from '@angular/core/testing';

import { MlsConfigService } from './mls-config.service';

describe('MlsConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MlsConfigService = TestBed.get(MlsConfigService);
    expect(service).toBeTruthy();
  });
});
