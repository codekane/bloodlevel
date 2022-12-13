import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatTableModule } from '@angular/material/table';
import { DosageDataService } from '../../services/dosage-data.service';
import { SubstanceDataService } from '../../services/substance-data.service';
import { DoseRecord, DoseRecords } from '../../models/dose-record';
import * as moment from 'moment';

@Component({
  selector: 'app-dose-history',
  templateUrl: './dose-history.component.html',
  styleUrls: ['./dose-history.component.scss']
})
export class DoseHistoryComponent implements OnInit {
  dose_history: DoseRecord[]|[] = [];
  displayedColumns:string[] = ['id', 'datetime', 'substance', 'dosage', 'roi', 'actions'];

 // @ViewChild(MatTableModule) doseHistoryTable!: MatTableModule<any>;

  constructor(
    private dosageDataService: DosageDataService,
    private substanceDataService: SubstanceDataService
  ) {
    this.dosageDataService.doseHistory.subscribe( (data: DoseRecords|any) => {
      if (data.dose_records) {
        this.dose_history = data.dose_records;
        this.dose_history = [...this.dose_history];
        console.log(data.dose_records);
      }
    });
  }

  getSubstanceName(id:number) {
    return this.substanceDataService.substanceNameFromID(id)
  }

  getDosageFormName(substance_id:number, dosage_form_id:any) {
    return this.substanceDataService.dosageFormNameFromID(substance_id, dosage_form_id);
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
