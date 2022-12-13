import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

import { Pharmacokinetics } from '../models/pharmacokinetics';
import { Substance } from '../models/substance';
import { DosageForm } from '../models/dosage-form';

@Injectable({
  providedIn: 'root'
})
export class SubstanceDataService {
  API_URL = "http://localhost:8000/";
  substanceData = new BehaviorSubject<Substance[]|[]>([]);

  //pharmacokineticData = new BehaviorSubject<Pharmacokinetics[]|[]>([]);
  //dosageFormData = new BehaviorSubject<DosageForm[]|[]>([]);

  constructor(
    private http:HttpClient
  ) {
    this.getSubstanceData().subscribe( (data:any) => {
      this.substanceData.next(data);
      console.log(data);
    });
  }

  getSubstanceData() {
    return this.http.get<any>(this.API_URL + 'substances/full/');
  }

  watchSubstanceData():Observable<any> {
    return this.substanceData.asObservable();
  }

  substanceNameFromID(id:number) {
    return this.substanceData.getValue().filter(substance => substance.id == id)[0].name
  }

  dosageFormNameFromID(substance_id:number, dosage_form_id:any) {
    if (typeof(dosage_form_id) == "number") {
      let substance = this.substanceData.getValue().filter(substance => substance.id == substance_id)[0]
      if (substance.dosage_forms) {
        let dosage_form = substance.dosage_forms.filter(form => form.id == dosage_form_id)[0]
        return dosage_form.name
      } else { return "" }
    } else { return "" }
  }



}
