import { TestBed } from '@angular/core/testing';

import { CookService } from './customer.service';

describe('CookService', () => {
  let service: CookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
