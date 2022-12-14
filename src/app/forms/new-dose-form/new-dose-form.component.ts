import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { MatSelectModule } from '@angular/material/select'
import { Subscription } from 'rxjs';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { Pharmacokinetics } from '../../models/pharmacokinetics';
import { Substance } from '../../models/substance';
import { DosageForm } from '../../models/dosage-form';
import { SubstanceDataService } from '../../services/substance-data.service';
import { DosageDataService } from '../../services/dosage-data.service';
import { DoseRecord } from '../../models/dose-record';


//interface DoseRecord {
//  timestamp: Date;
//  substance_id: number;
//  ROI: string;
//  dosage: number;
//  dosage_unit: string;
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

  substanceSub: Subscription;
  substanceData: Substance[]|[] = [];

  ROIList: string[] = ["Oral", "Insufflated", "Sublingual", "Rectal"]

  pharmacokinetics: Pharmacokinetics[] = [
    {substance_id: 1, ROI: "Oral", bioavailability: "90.00", tLag: "0.8", tMax: "03:00:00", tHalf: "11:00:00"},
    {substance_id: 1, ROI: "Insufflated", bioavailability: "90.00", tLag: "0.2", tMax: "03:00:00", tHalf: "11:00:00"},
    {substance_id: 1, ROI: "Sublingual", bioavailability: "90.00", tLag: "0.2", tMax: "03:00:00", tHalf: "11:00:00"},
    {substance_id: 1, ROI: "Rectal", bioavailability: "90.00", tLag: "0.2", tMax: "03:00:00", tHalf: "11:00:00"}
  ]

  dosage_forms: DosageForm[]|[] = [];
  dosage_form_options: string[]|[] = [];

  UNITS: string[] = ["mg"]

  constructor(
    private substanceDataService: SubstanceDataService,
    private dosageDataService: DosageDataService
  ) {
    this.substanceSub = this.substanceDataService.watchSubstanceData().subscribe( (data:Substance[]|[]) => {
      this.substanceData = data;
      console.log(this.substanceData);
    });

    this.newDoseForm = new FormGroup({
      substance: new FormControl(''),
      ROI: new FormControl(''),
      timestamp: new FormControl(new Date()),
      dosage: new FormControl(''),
      dosage_unit: new FormControl('mg'),
      dosage_form: new FormControl('')
    });
  }


  dateToString(date:Date):string {
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getUTCMonth() + 1;

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let dateStr = year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":" + seconds + "Z";
    return dateStr;

  }

  getDosageID(name:string) {
    let result = this.dosage_forms.filter(form => form.name == name)
    if (result.length >= 1)
      return result[0].id;
    else
      return null
  }

  newDose() {
    if (!this.newDoseForm.valid) { false; } else {
      const record:DoseRecord = {
        timestamp: this.dateToString(this.newDoseForm.value.timestamp),
        substance_id: this.newDoseForm.value.substance.id,
        ROI: this.newDoseForm.value.ROI,
        dosage: this.newDoseForm.value.dosage,
        dosage_unit: this.newDoseForm.value.dosage_unit,
        dosage_form_id: this.getDosageID(this.newDoseForm.value.dosage_form)
      }
      this.dosageDataService.recordDose(record);
      this.newDoseForm.reset();
    }
  }

  ROI_options:string[]|[] = [];
  onSelectSubstance(e:any) {
    console.log(e);

    this.ROI_options = e.pharmacokinetics.map( (data:Pharmacokinetics) => {
      return data.ROI;
    });

    this.dosage_forms = e.dosage_forms.map( (dosageForm:DosageForm) => {
      return dosageForm;
    });
    this.dosage_form_options = e.dosage_forms.map( (dosageForm:DosageForm) => {
      return dosageForm.name;
    });
  }

  ngOnInit(): void {
  }

}
