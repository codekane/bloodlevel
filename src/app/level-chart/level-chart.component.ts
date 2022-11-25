import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-level-chart',
  templateUrl: './level-chart.component.html',
  styleUrls: ['./level-chart.component.scss']
})
export class LevelChartComponent implements OnInit {
  public chart: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart("LevelChart", {
      type: 'line',
      data: {
        labels: ["8:15 PM", "Nov. 23 12:00 AM", "4:00 AM", "8:00 AM", "12:00 PM", "4:00 PM", "8:00 PM"],
        datasets: [
          {
            label: "Dexedrine",
            data: ['42.03', '37.09', '32.04', '23.09', '17.09', '34.49', '44.49', '39.03'],
            backgroundColor: 'red'
          },
          {
            label: "Clonazepam",
            data: ['0.25', '0.74', '0.49', '4.12', '3.05', '2.76', '3.55', '5.09'],
            backgroundColor: 'limegreen',
          }
        ]
      },
      options: {
        maintainAspectRatio: false
      }
    });
  }
}
