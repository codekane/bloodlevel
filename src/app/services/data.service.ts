import { Injectable } from '@angular/core';
import { Dose, DOSES } from '../models/dose';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = "http://localhost:10000/";
  DOSES_URL = this.API_URL + "doses";
  DOSE_URL = this.API_URL + "dose";

  doseHistory = new BehaviorSubject<Dose[]|[]>([]);

  constructor(private http: HttpClient) {
    this.getAllDoses().subscribe( (data:Dose[]) => {
      this.doseHistory.next(data);
    });
  }


  getDoses(): Dose[] {
    return DOSES
  }


  getAllDoses() {
    return this.http.get<Dose[]>(this.DOSES_URL)
  }

  getDose(id:number) {
    return this.http.get<Dose>(this.DOSE_URL + `/${id}`)
  }

  addDose(dose:Dose):Observable<Dose> {
    return this.http.post<Dose>(this.DOSE_URL, JSON.stringify(dose))
  }

  deleteDose(dose:Dose) {
    var url = this.DOSE_URL + `/${dose.id}`;
    console.log(url);
    return this.http.delete<any>(url)
  }

  updateDose(dose:Dose) {
    return this.http.post<Dose>(this.DOSE_URL + `/${dose.id}`, JSON.stringify(dose))
  }
}
