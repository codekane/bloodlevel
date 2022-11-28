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

  watchDoseHistory():Observable<any> {
    return this.doseHistory.asObservable();
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

  addDose(dose:Dose):void {
    this.http.post<Dose>(this.DOSE_URL, JSON.stringify(dose)).subscribe( (data:Dose) => {
      this.getAllDoses().subscribe( (data:Dose[]) => {
        this.doseHistory.next(data);
      });
    });
  }

  deleteDose(dose:Dose) {
    var url = this.DOSE_URL + `/${dose.id}`;

    this.http.delete<any>(url).subscribe( (data:any) => {
      this.getAllDoses().subscribe( (data:Dose[]) => {
        this.doseHistory.next(data);
      });
    });

    return this.http.delete<any>(url)
  }

  updateDose(dose:Dose) {
    return this.http.post<Dose>(this.DOSE_URL + `/${dose.id}`, JSON.stringify(dose))
  }
}
