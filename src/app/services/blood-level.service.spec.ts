import { TestBed } from '@angular/core/testing';

import { BloodLevelService } from './blood-level.service';

describe('BloodLevelService', () => {
  let service: BloodLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
