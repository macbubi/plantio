import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PlantService {

  constructor(private _http: HttpClient) { }

  /**
   * getPlantData fetches plant data with params from backend
   * @param {date} dateFrom
   * @param {date} dateTo
   * @param {string} plantId
   * @returns {Observable}
   */
  getPlantData(dateFrom, dateTo, plantId) {
    return this._http.get("http://localhost:3000/app/plant/getData", {
      params: {
        plantId: plantId,
        dateFrom: dateFrom,
        dateTo: dateTo
      }
    });
  }
}