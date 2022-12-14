import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatTableModule } from '@angular/material/table';
import { DosageDataService } from '../../services/dosage-data.service';
import { SubstanceDataService } from '../../services/substance-data.service';
import { DoseRecord, DoseRecords } from '../../models/dose-record';
import { Subscription } from 'rxjs';
import { Substance } from '../../models/substance';
import * as moment from 'moment';

@Component({
  selector: 'app-dose-history',
  templateUrl: './dose-history.component.html',
  styleUrls: ['./dose-history.component.scss']
})
export class DoseHistoryComponent implements OnInit {
  displayedColumns:string[] = ['id', 'datetime', 'substance', 'dosage', 'roi', 'actions'];


  doseRecordSub: Subscription;
  dose_history: DoseRecord[]|[] = [];

  substanceSub:Subscription;
  substanceData: Substance[]|undefined = undefined;



 // @ViewChild(MatTableModule) doseHistoryTable!: MatTableModule<any>;

  constructor(
    private dosageDataService: DosageDataService,
    private substanceDataService: SubstanceDataService
  ) {
    //this.dosageDataService.doseHistory.subscribe( (data: DoseRecords|any) => {
    //  if (data.dose_records) {
    //    this.dose_history = data.dose_records;
    //    this.dose_history = [...this.dose_history];
    //  }
    //});

    this.doseRecordSub = this.dosageDataService.watchDoseHistory().subscribe ( (data: DoseRecords|undefined) => {
      if (data && data.dose_records) {
        this.dose_history = data.dose_records;
        this.dose_history = [...this.dose_history];
      }
    });

    this.substanceSub = this.substanceDataService.watchSubstanceData().subscribe( (data:Substance[]) => {
      this.substanceData = data;
    });
  }

  getSubstanceName(id:number) {
    let substance = this.substanceData!.find(substance => substance.id == id);
    if (substance && substance.name)
      return substance.name;
    else
      return id
  }

  getDosageFormName(substance_id:number, dosage_form_id:any) {
    if (typeof(dosage_form_id) == "number") {
      let substance = this.substanceData!.find(substance => substance.id == substance_id);
        if (substance && substance.dosage_forms) {
          let dosage_form = substance.dosage_forms.find(form => form.id == dosage_form_id)
          if (dosage_form && dosage_form.name)
            return dosage_form.name
        }
    }
    return ""
  }

  getDateFromTimestamp(timestamp:string) {
    return timestamp.match(/\d+-\d+-\d+/);
  }

  getTimeFromTimestamp(timestamp:string) {
    return timestamp.match(/\d{2}:\d{2}:\d{2}/)
  }

  getDatesFromHistory(doseRecords:DoseRecords|any) {
    let dates = [];
  }

  clickEditDose(event:any, id:number) {
    console.log(id);
  }

  clickDeleteDose(event:any, id:number) {
    this.dosageDataService.deleteDose(id);
  }

  ngOnInit(): void {
  }

}
