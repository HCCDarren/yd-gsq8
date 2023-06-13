import { TestBed } from '@angular/core/testing';

import { CipherService } from './cipher.service';

describe('EncryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CipherService = TestBed.get(CipherService);
    expect(service).toBeTruthy();
  });
});
