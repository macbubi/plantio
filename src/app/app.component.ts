import { Component, OnInit } from '@angular/core';
import { PlantService } from './services/plant-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plantio';
  measures = [];
  constructor(private plantService: PlantService) { }
  
  ngOnInit() {
    this.plantService.getPlantData('','','').subscribe((measures: any[]) => this.measures = measures);
  }
}
