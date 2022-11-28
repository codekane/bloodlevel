import { Component, OnInit } from '@angular/core';
import { Dose } from '../../models/dose';
import { DataService } from '../../services/data.service';
import { FormControl, FormGroup } from '@angular/forms';
import Medications from '../../../../data/medications.json';

@Component({
  selector: 'app-old-dose-form',
  templateUrl: './old-dose-form.component.html',
  styleUrls: ['./old-dose-form.component.scss']
})
export class OldDoseFormComponent implements OnInit {
  newDoseForm: FormGroup;

  med_names = Medications.map(med => { return med.name });


  constructor(private dataService: DataService) {
    this.newDoseForm = new FormGroup({
      date: new FormControl('2022-11-10'),
      time: new FormControl(''),
      dosage: new FormControl(''),
      dosage_unit: new FormControl('mg'),
      substance: new FormControl('')
    });

  }

  ngOnInit(): void {
  }


  changeSubstance(e: any) {
    this.newDoseForm.controls['substance'].setValue(e.target.value, {
      onlySelf: true,
    });
  }


  addDose(form: FormGroup) {
    if (!this.newDoseForm.valid) {
      false;
    } else {
      const dose = this.newDoseForm.value as Dose;
      this.dataService.addDose(dose);//.subscribe( (data:Dose) => {
      this.newDoseForm.reset();
    }
  }

}
