import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { DoseRecord } from '../models/dose-record';

@Injectable({
  providedIn: 'root'
})
export class DosageDataService {
  API_URL = "http://localhost:8000/";

  doseHistory = new BehaviorSubject<DoseRecord[]|undefined>(undefined);

  constructor(
    private http: HttpClient,
  ) {
    this.getAllDoses();
    }

  recordDose(dose:DoseRecord) {
    let post_url = this.API_URL + "dose/";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post<any>(post_url, JSON.stringify(dose), { 'headers': headers }).subscribe( (data:any) => {
      console.log(data);
      this.getAllDoses();
    });
  }

  deleteDose(id:number) {
    let delete_url = this.API_URL + "dose/" + id + "/";

    this.http.delete<any>(delete_url).subscribe( (result:any) => {
      this.getAllDoses();
    });
  }

  watchDoseHistory():Observable<any> {
    return this.doseHistory.asObservable();
  }

  getAllDoses() {
    this.http.get<any>(this.API_URL + "doses/").subscribe( (data: any) => {
      this.doseHistory.next(data);
      console.log(data);
    });
  }

}
