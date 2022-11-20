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
      console.log("New dosage history has been received.");
      this.dose_history = data;
    });
  }
  watchBloodLevel():Observable<any> {
    return this.bloodLevel.asObservable();
  }

  calculateBloodLevel(now:Date):number|undefined {
    var dosages = this.dose_history.map( (dose:any) => {
      return {
        ...dose,
        'datetime': new Date(`${dose.date}T${dose.time}`)
      }
    }).sort( (a:any, b:any) => { return a['datetime'] - b['datetime'] });

    var level = 0;
    var total = 0;

    for (let i = 0; i < dosages.length; i++) {
      const key = i as number;
      var dose = dosages[i]
      var half_life = 11;
      if (dose && dose.dosage && i == 0) {
        level = dose.dosage;
        total += dose.dosage;
        //console.log(`First dose of series being calculated. Level equal to ${level}, total equal to ${total}`);
      } else if (dose && dose.dosage && i <= dosages.length - 1) {
        var hour_difference = (dosages[i].datetime - dosages[i - 1].datetime) / 3600000;
        var half_life_number = hour_difference / half_life;
        var percent_degraded = half_life_number * 0.5;
        var amount_remaining = 1 - percent_degraded;

        var level_down = level * amount_remaining;
        var level_up = level_down + dose.dosage;
        level = level_up
        total += dose.dosage;

        //console.log(`Between ${dosages[i]} and ${dosages[i-1]} calculated ${hour_difference}, amount to ${half_life_number} half lives.`);
        //console.log(`Blood level is now ${level} after dosing ${dose.dosage} on top of the degraded ${level_down}`);

        if (i == dosages.length -1) {
          //console.log(`Final Iteration. Calculating ${hour_difference} between this does and last dose. Before degradation blood level is ${level}`);
          var hour_difference = (now.getTime() - dosages[i].datetime.getTime()) / 3600000;
          var half_life_number = hour_difference / half_life;
          var percent_degraded = half_life_number * 0.5;
          var amount_remaining = 1 - percent_degraded;

          level = level * amount_remaining;

          var round_number = Math.round(level * 100) / 100
          this.bloodLevel.next(round_number);

          //console.log(`based on an hour difference of ${hour_difference} I calculate ${half_life_number} half-lives, ${percent_degraded}, and a new blood level of ${level}`);
          return round_number
        }

      }
    }
    return undefined
  }
}
