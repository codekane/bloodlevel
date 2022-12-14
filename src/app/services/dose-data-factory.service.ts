import { DoseData } from '../models/dose-data';
import { DoseRecord } from '../models/dose-record';
import { Substance } from '../models/substance';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubstanceDataService } from './substance-data.service';

@Injectable({
  providedIn: 'root'
})
export class DoseDataFactoryService {
  substanceSub: Subscription;
  substanceData: Substance[]|undefined = undefined;

  constructor(private substanceDataService:SubstanceDataService) {
    this.substanceSub = this.substanceDataService.watchSubstanceData().subscribe( (data:Substance[]) => {
      this.substanceData = data;
    });
  }

  createDoseDataSet(doseRecords:DoseRecord[], substances:Substance[]) {
    return doseRecords.map( (doseRecord:DoseRecord) => {
      let substance = substances.find( drug => drug.id == doseRecord.substance_id);
      return this.createDoseData(doseRecord, substance!);
    });
  }

  createDoseData(doseRecord:DoseRecord, substance:Substance) {
    //let substance = this.substanceData.find( drug => drug.id == doseRecord.substance_id);
    return new DoseData(doseRecord, substance);
  }
}
