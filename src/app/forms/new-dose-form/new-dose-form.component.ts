import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { MatSelectModule } from '@angular/material/select'



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


  constructor() {
    this.newDoseForm = new FormGroup({
      substance: new FormControl(''),
      ROI: new FormControl('')
    });
  }
  newDose() {
    console.log("Fucking Angular");
  }

  ngOnInit(): void {
      }

}
