import { TestBed } from '@angular/core/testing';

import { DosageDataService } from './dosage-data.service';

describe('DosageDataService', () => {
  let service: DosageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DosageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
