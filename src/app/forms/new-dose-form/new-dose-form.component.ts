import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { MatSelectModule } from '@angular/material/select'
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';


interface DoseRecord {
  timestamp: Date;
  substance_id: number;
  ROI: string;
  dosage: number;
  dosage_unit: string;
}

interface Substance {
  id: number;
  name: string;
}

interface Pharmacokinetics {
  substance_id: number;
  ROI: string;
  bioavailability: string;
  tOnset: string;
  tMax: string;
  tHalf: string;
}

//interface ROI {
//
//}


@Component({
  selector: 'app-new-dose-form',
  templateUrl: './new-dose-form.component.html',
  styleUrls: ['./new-dose-form.component.scss']
})
export class NewDoseFormComponent implements OnInit {
  newDoseForm: FormGroup;
  selectedSubstance: string = "";
  selectedDatetime: Date = new Date();
  selectedROI: string = "Oral";

  substances: Substance[] = [
    {id: 1, name: "Dexedrine"},
    {id: 2, name: "Adderall"},
    {id: 3, name: "Mephedrone"},
    {id: 4, name: "Bupropion"}
  ]

  ROIList: string[] = ["Oral", "Insufflated", "Sublingual", "Rectal"]

  pharmacokinetics: Pharmacokinetics[] = [
    {substance_id: 1, ROI: "Oral", bioavailability: "90.00", tOnset: "01:00:00", tMax: "03:00:00", tHalf: "11:00:00"},
    {substance_id: 1, ROI: "Insufflated", bioavailability: "90.00", tOnset: "00:15:00", tMax: "03:00:00", tHalf: "11:00:00"},
    {substance_id: 1, ROI: "Sublingual", bioavailability: "90.00", tOnset: "00:15:00", tMax: "03:00:00", tHalf: "11:00:00"},
    {substance_id: 1, ROI: "Rectal", bioavailability: "90.00", tOnset: "00:15:00", tMax: "03:00:00", tHalf: "11:00:00"}
  ]

  UNITS: string[] = ["mg"]

  constructor() {
    this.newDoseForm = new FormGroup({
      substance: new FormControl(''),
      ROI: new FormControl(''),
      timestamp: new FormControl(new Date()),
      dosage: new FormControl(''),
      dosage_unit: new FormControl('mg')
    });
  }
  newDose() {
    if (!this.newDoseForm.valid) {
      false;
    } else {
      const record:DoseRecord = {
        timestamp: this.newDoseForm.value.timestamp,
        substance_id: this.newDoseForm.value.substance.id,
        ROI: this.newDoseForm.value.ROI,
        dosage: this.newDoseForm.value.dosage,
        dosage_unit: this.newDoseForm.value.dosage_unit
      }
    }

    //const dose = this.newDoseForm.value as Dose;
    //this.doseDataService.recordDose(dose);
    //console.log(event);
    console.log(this.newDoseForm.value);
    this.newDoseForm.reset();
  }

  ngOnInit(): void {
  }

}
