import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-blood-level-graph',
  templateUrl: './blood-level-graph.component.html',
  styleUrls: ['./blood-level-graph.component.scss']
})
export class BloodLevelGraphComponent implements OnInit {

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      "Dec. 01",
      "Dec. 02",
      "Dec. 03",
      "Dec. 04",
      "Dec. 05",
      "Dec. 06",
      "Dec. 07",
      "Dec. 08",
      "Dec. 09",
      "Dec. 10",
      "Dec. 11",
      "Dec. 12",
      "Dec. 13",
      "Dec. 14",
      "Dec. 15"
    ],
    datasets: [
      {
        data: [ 0, 15, 30, 60, 90, 45, 80, 30, 150, 80, 30, 15, 7, 50, 60 ],
        label: 'Dexedrine',
        fill: true,
        tension: 0.5,
        borderColor: 'red',
        backgroundColor: 'red'
      }
    ]
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: false
  };



  constructor() { }

  ngOnInit(): void {
  }

}
