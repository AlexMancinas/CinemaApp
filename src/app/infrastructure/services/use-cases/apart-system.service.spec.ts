import { TestBed } from '@angular/core/testing';

import { ApartSystemService } from './apart-system.service';

describe('ApartSystemService', () => {
  let service: ApartSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
