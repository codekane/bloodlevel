import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { SubstanceDataService } from '../services/substance-data.service';
import { DosageDataService } from '../services/dosage-data.service';
import { DoseDataFactoryService } from '../services/dose-data-factory.service';
import { Subscription, zip } from 'rxjs';
import { Substance } from '../models/substance';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DoseRecord, DoseRecords } from '../models/dose-record';
import { DoseData } from '../models/dose-data';
import { FormControl, FormGroup } from '@angular/forms';


type ChartDataObject = {
  [key: string]: number;
}

@Component({
  selector: 'app-blood-level-graph',
  templateUrl: './blood-level-graph.component.html',
  styleUrls: ['./blood-level-graph.component.scss']
})
export class BloodLevelGraphComponent implements OnInit {
  startDate = new Date("2022-11-19");
  today = new Date();
  clone = new Date(this.today);
  endDate = new Date(this.clone.setDate(this.clone.getDate() + 1));

  bloodGraphRangeForm:FormGroup;

  substanceSub:Subscription;
  substanceData:Substance[]|undefined = undefined;

  doseRecordSub:Subscription;
  doseRecordData:DoseRecord[]|[] = [];
  doseDataSet:DoseData[]|[] = [];

  chartDataPoints:ChartDataObject|undefined = undefined;

  constructor(
    private substanceDataService:SubstanceDataService,
    private dosageDataService:DosageDataService,
    private doseDataFactoryService:DoseDataFactoryService
  ) {
    this.bloodGraphRangeForm = new FormGroup({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.endDate)
    });

    this.substanceSub = this.substanceDataService.watchSubstanceData().subscribe( (data:Substance[]) => {
      this.substanceData = data;
    });

    this.doseRecordSub = this.dosageDataService.watchDoseHistory().subscribe( (data:DoseRecords|undefined) => {
      if (data && data.dose_records) {
        this.doseRecordData = data.dose_records;
        if (this.substanceData && this.doseRecordData) {
          this.doseDataSet = this.doseDataFactoryService.createDoseDataSet(this.doseRecordData, this.substanceData);
          console.log(this.doseDataSet);
          this.chartDataPoints = this.getChartData(this.startDate, this.endDate);
          this.setChartData();
        }
      }
    });
  }

  getChartLabels():string[]|[] {
    if (this.chartDataPoints)
      return Object.keys(this.chartDataPoints)
    else
      return []
  }

  getChartDataPoints():number[]|[] {
    if (this.chartDataPoints)
      return Object.values(this.chartDataPoints)
    else
      return []
  }

  startDateChange() {
    this.startDate = this.bloodGraphRangeForm.controls['startDate'].value;
    this.chartDataPoints = this.getChartData(this.startDate, this.endDate);
    this.setChartData();

  }

  endDateChange() {
    this.endDate = this.bloodGraphRangeForm.controls['endDate'].value;
    this.chartDataPoints = this.getChartData(this.startDate, this.endDate);
    this.setChartData();
  }

  showAllTimeData() {
    let start = new Date("2022-11-19");
    let today = new Date();
    let end = new Date(today.setDate(today.getDate() + 2));
    this.startDate = start;
    this.endDate = end;
    this.setChartData();
    //this.bloodGraphRangeForm.controls['startDate'].setValue = start;
    //this.bloodGraphRangeForm.controls['endDate'].setValue = end;

  }


  getDatesInRange(start:Date, end:Date):Date[] {
    for(var arr=[],dt=new Date(start); dt<= new Date(end); dt.setDate(dt.getDate()+1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }

  makeChartLabels(start:Date, end:Date):string[] {
    for(var arr=[],dt=new Date(start); dt<= new Date(end); dt.setDate(dt.getDate()+1)) {
      arr.push(new Date(dt).toString().match(/ (\w+\ \d+)/)![0]);
    }
    return arr;
  }

  getChartData(start:Date, end:Date):any {

    // Filter doseDataSet to include only valid values
    let dataset = this.doseDataSet.filter( (data:DoseData) =>
      data.datestamp && data.datestamp <= end && data.endstamp && data.endstamp >= start
    ).sort( (a:DoseData, b:DoseData):number => {return +a.datestamp! - +b.datestamp!});
    console.log(dataset);

    let output:ChartDataObject = {}
    let current = new Date(start);
    while (current <= end) {
      let level = 0;
      for (let i=0; i < dataset.length; i++) {
        let dose = dataset[i];
        if (dose.datestamp! > current) { continue } // Prevent later doses in the set from affecting the reading from earlier ones.
        let bloodLevel = dose.calculateBloodLevel(current);
        //console.log(`at ${current.toLocaleString()} level of ${level} is increasing by ${bloodLevel} on account of ${dataset[i].id} from ${dose.datestamp!.toLocaleString()}`);
        //level += dataset[i].calculateBloodLevel(current)
        level += bloodLevel;
      }

      output[current.toLocaleString()] = level;
      current.setMinutes(current.getMinutes() + 15);
    }
    return output
  }

  setChartData() {
    this.chartData = {
      labels: this.getChartLabels(),
      datasets: [
        {
          data: this.getChartDataPoints(),
          label: 'Dexedrine',
          fill: true,
          tension: 0.5,
          borderColor: 'red',
          backgroundColor: 'red'
        }
      ]
    }
  }

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Dexedrine',
        fill: true,
        tension: 0.5,
        borderColor: 'red',
        backgroundColor: 'red'
      }
    ]
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
  };


  ngOnInit(): void {
  }


}
