import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldDoseFormComponent } from './old-dose-form.component';

describe('OldDoseFormComponent', () => {
  let component: OldDoseFormComponent;
  let fixture: ComponentFixture<OldDoseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldDoseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldDoseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
