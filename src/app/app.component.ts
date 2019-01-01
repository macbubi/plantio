import { Component, OnInit } from '@angular/core';
import { PlantService } from './services/plant-data.service';
import { Chart } from 'chart.js';
import {ElementRef, ViewChild} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  chart;
  title = 'plantio';
  measures = [
    1,2,3,4,3,5,7
  ];
  dataLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  config = {
    type: 'line',
    data: {
      labels: this.dataLabels,
      datasets: [{
        label: 'Water (mm)',
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: this.measures,
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  };
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  
  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.plantService.getPlantData('', '', '').subscribe((measures: any[]) => {
      this.measures = measures
      this.chart = new Chart(this.chartCanvas.nativeElement.getContext('2d'), this.config);
      debugger
    });
  }
}
