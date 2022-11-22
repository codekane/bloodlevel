import { Injectable } from '@angular/core';
import { Dose } from '../models/dose';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';
import Medications from '../../../data/medications.json';


@Injectable({
  providedIn: 'root'
})
export class BloodLevelService {
  bloodLevel = new BehaviorSubject<any>(null);
  dosageHistorySub: Subscription;
  dose_history:any;

  constructor(private dataService: DataService) {
    this.dosageHistorySub = this.dataService.watchDoseHistory().subscribe( (data:any) => {
      this.dose_history = data;
    });
  }
  watchBloodLevel():Observable<any> {
    return this.bloodLevel.asObservable();
  }

  // Calculate how much of a dose is remaining after the elapsed time between start and end, based on half-life
  half_life_effect(dose:number, half_life:number, elapsed_time:number) {
    return dose * Math.pow(0.5, elapsed_time / half_life);
  }

  add_datetime_to_dose_history(dose_history:any) {
    return dose_history.map( (dose:any) => {
      return {
        ...dose,
        'datetime': new Date(`${dose.date}T${dose.time}`)
      }
    }).sort( (a:any, b:any) => { return a['datetime'] -b['datetime'] });;
  }

  calculateBloodLevel(now:Date):number|undefined {
    var dosages = this.add_datetime_to_dose_history(this.dose_history);
    var level = 0;

    for (let i = 0; i < dosages.length; i++) {
      const key = i as number;
      var dose = dosages[i]
      var half_life = 11;

      if (dose && dose.dosage && i == 0) {
        level = dose.dosage;
      } else if (dose && dose.dosage && i <= dosages.length - 1) {
        var hour_difference = (dosages[i].datetime - dosages[i - 1].datetime) / 3600000;
        level = this.half_life_effect(level, half_life, hour_difference) + dose.dosage;

        if (i == dosages.length -1) {
          var hour_difference = (now.getTime() - dosages[i].datetime.getTime()) / 3600000;

          level = Math.round(this.half_life_effect(level, half_life, hour_difference) * 100 ) / 100;
          this.bloodLevel.next(level);

          return level
        }

      }
    }
    return undefined
  }
}
