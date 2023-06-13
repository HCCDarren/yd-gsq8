import { TestBed } from '@angular/core/testing';

import { GoogleAuthStoreService } from './google-auth-store.service';

describe('GoogleAuthStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleAuthStoreService = TestBed.get(GoogleAuthStoreService);
    expect(service).toBeTruthy();
  });
});
