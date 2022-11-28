import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDoseFormComponent } from './new-dose-form.component';

describe('NewDoseFormComponent', () => {
  let component: NewDoseFormComponent;
  let fixture: ComponentFixture<NewDoseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDoseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDoseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
