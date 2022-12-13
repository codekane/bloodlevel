import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodLevelGraphComponent } from './blood-level-graph.component';

describe('BloodLevelGraphComponent', () => {
  let component: BloodLevelGraphComponent;
  let fixture: ComponentFixture<BloodLevelGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodLevelGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodLevelGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
