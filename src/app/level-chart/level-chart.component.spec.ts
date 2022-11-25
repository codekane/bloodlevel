import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelChartComponent } from './level-chart.component';

describe('LevelChartComponent', () => {
  let component: LevelChartComponent;
  let fixture: ComponentFixture<LevelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
