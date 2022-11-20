import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Medications from '../../data/medications.json';
import { DataService } from './services/data.service';
import { Dose } from './models/dose';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  newDoseForm: FormGroup;
  title = 'bloodlevel';
  public now:Date = new Date();
  doses: Dose[]|null;
  dosage_history: Dose[]|[] = [];
  dose_history: Dose[]|[] = [];

  med_names = Medications.map(med => { return med.name });

  constructor(
    private dataService: DataService,
  ){
    this.newDoseForm = new FormGroup({
      date: new FormControl('2022-11-10'),
      time: new FormControl(''),
      dosage: new FormControl(''),
      dosage_unit: new FormControl('mg'),
      substance: new FormControl('')
    });
    setInterval( () => { this.now = new Date(); }, 1);
    console.log(Medications);

    this.doses = this.getDoses();

    this.dataService.doseHistory.subscribe( (data:Dose[]|[]) => {
      this.dose_history = data;
    });

    this.dataService.getAllDoses().subscribe( (data:Dose[]) => {
      console.log(data);
      this.dosage_history = data;
      console.log(this.dosage_history);
    });


  }

  ngOnInit(): void {
    this.getDoses();
  }

  getDosageHistory(): void {
    this.dataService.getAllDoses().subscribe( (data:Dose[]) => {
      console.log(data);
      this.dosage_history = data;
    });
  }

  getDoses(): Dose[] {
    return this.dataService.getDoses();
  }

  changeSubstance(e: any) {
    console.log(this.newDoseForm);
    this.newDoseForm.controls['substance'].setValue(e.target.value, {
      onlySelf: true,
    });
  }

  addDose(form: FormGroup) {
    if (!this.newDoseForm.valid) {
      false;
    } else {
      const dose = this.newDoseForm.value as Dose;
      this.dataService.addDose(dose).subscribe( (data:Dose) => {
        this.newDoseForm.reset();
        this.dataService.getAllDoses().subscribe( (data:Dose[]) => {
          this.dataService.doseHistory.next(data);
        });
      });
    }
  }

  deleteDose(dose:Dose) {
    this.dataService.deleteDose(dose).subscribe( (data:any) => {
      console.log("Successfullly deleted dose");
      console.log(data)
    });

  }


}
