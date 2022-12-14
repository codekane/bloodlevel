import { TestBed } from '@angular/core/testing';

import { DoseDataFactoryService } from './dose-data-factory.service';

describe('DoseDataFactoryService', () => {
  let service: DoseDataFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoseDataFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
