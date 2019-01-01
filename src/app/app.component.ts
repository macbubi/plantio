import { Component, OnInit } from '@angular/core';
import { PlantService } from './services/plant-data.service';
import { Chart } from 'chart.js';
import { ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private MEASURE_TYPES = [{
    name: "humidity",
    label: "Humidity",
    color: '#ccc'
  }, {
    name: "moisture",
    label: "Moisture",
    color: 'gray'
  }, {
    name: "sunlight",
    label: "Sunlight",
    color: 'yellow'
  }, {
    name: "temprature",
    label: "Temprature",
    color: '#c6b152'
  }];
  chart;
  title = 'plantio';
  measures = [];


  @ViewChild('chartCanvas') chartCanvas: ElementRef;

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.plantService.getPlantData('', '', '').subscribe((measures: any[]) => {
      this.measures = measures;
      this.chart = new Chart(this.chartCanvas.nativeElement.getContext('2d'), this.getChartConfig());
    });
  }

  getChartConfig() {
    return {
      type: 'line',
      data: {
        labels: this.measures.map((measure) => measure.measuredAt),
        datasets: this.MEASURE_TYPES.map((measureType) => {
          return {
            label: measureType.label,
            fill: false,
            backgroundColor: measureType.color,
            borderColor: measureType.color,
            data: this.measures.map((measure) => measure[measureType.name]),
          };
        })
      },
      options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        
      }
    };
  }
}
