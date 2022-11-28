import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BloodLevelService } from '../services/blood-level.service';
import { Dose } from '../models/dose';

@Component({
  selector: 'app-version1',
  templateUrl: './version1.component.html',
  styleUrls: ['./version1.component.scss']
})
export class Version1Component implements OnInit {
  dose_history: Dose[]|[] = [];
  totalDosage:number = 0;
  bloodLevel:number|undefined = 0;
  public now:Date = new Date();
  constructor(
    private dataService: DataService,
    private bloodLevelService: BloodLevelService) {
    this.now = new Date();
    this.bloodLevel = this.bloodLevelService.calculateBloodLevel(this.now)
    setInterval( () => {
      this.now = new Date();
      this.bloodLevel = this.bloodLevelService.calculateBloodLevel(this.now);
    }, 1000);

    this.dataService.doseHistory.subscribe( (data:Dose[]|[]) => {
      this.dose_history = data;
      this.totalDosage = this.calculate_total_dosage(data);
      this.bloodLevel = this.bloodLevelService.calculateBloodLevel(this.now);
    });
  }

  ngOnInit(): void {
  }

  deleteDose(dose:Dose):void {
    this.dataService.deleteDose(dose);
  }

  calculate_total_dosage(data:Dose[]|[]):number {
    var total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].dosage;
    }
    return total
  }
}
