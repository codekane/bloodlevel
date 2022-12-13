import { TestBed } from '@angular/core/testing';

import { SubstanceDataService } from './substance-data.service';

describe('SubstanceDataService', () => {
  let service: SubstanceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubstanceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
