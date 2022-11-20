import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Medications from '../../data/medications.json';
import { DataService } from './services/data.service';
import { BloodLevelService } from './services/blood-level.service';
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
  dose_history: Dose[]|[] = [];
  bloodLevel:number|undefined = 0;
  totalDosage:number = 0;

  med_names = Medications.map(med => { return med.name });

  constructor(
    private dataService: DataService,
    private bloodLevelService: BloodLevelService
  ){
    this.newDoseForm = new FormGroup({
      date: new FormControl('2022-11-10'),
      time: new FormControl(''),
      dosage: new FormControl(''),
      dosage_unit: new FormControl('mg'),
      substance: new FormControl('')
    });
    setInterval( () => {
      this.now = new Date(); 
      this.bloodLevel = this.bloodLevelService.calculateBloodLevel(this.now);

    }, 1000);


    this.dataService.doseHistory.subscribe( (data:Dose[]|[]) => {
      this.dose_history = data;
      this.totalDosage = this.calculate_total_dosage(data);
      this.bloodLevel = this.bloodLevelService.calculateBloodLevel(this.now);
    });
  }

  calculate_total_dosage(data:Dose[]|[]):number {
    var total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].dosage;
    }
    return total
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
      this.dataService.addDose(dose).subscribe( (data:Dose) => {
        this.newDoseForm.reset();
        this.dataService.getAllDoses().subscribe( (data:Dose[]) => {
          this.dataService.doseHistory.next(data);
        });
      });
    }
  }

  deleteDose(dose:Dose):void {
    this.dataService.deleteDose(dose).subscribe( (data:any) => {
      console.log("Successfullly deleted dose record");
    });
  }

}
