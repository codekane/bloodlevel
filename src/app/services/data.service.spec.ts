import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
      ]
    }).compileComponents();
  });
  let service: DataService;

  beforeEach(() => {
    //TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
