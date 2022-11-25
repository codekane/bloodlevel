import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BloodLevelService } from './blood-level.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

describe('BloodLevelService', () => {
  let service: BloodLevelService;
  //beforeEach( () => { service = new BloodLevelService(new DataService(=)); });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
      ],
      providers: [
        BloodLevelService,
        DataService
      ],
    }).compileComponents();
    service = new BloodLevelService;

    service = TestBed.inject(BloodLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should be accurately calculating half life", () => {
    const fixture = TestBed.createComponent(BloodLevelService);
    const app = fixture.debugElement.componentInstance;

    let halfLifeHours:number = 11
    let in_tiny_seconds:number = halfLifeHours * 1000 * 60 * 60

    let startDate:Date = new Date("2022-10-20T21:00:00");
    let endDate:Date = new Date("2022-10-21T09:00:00");

    let elapsedTime:any = Number(endDate.getTime()) - Number(startDate.getTime());
    let num_half_lives:number = elapsedTime / in_tiny_seconds

    let computed_effect_of_half_life:number = 0.5 * Math.pow(elapsedTime, in_tiny_seconds)

    expect(app.calculate_half_life(100, in_tiny_seconds, elapsedTime).toBe(computed_effect_of_half_life));


  });
});
