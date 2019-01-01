import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";

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
    const url = environment.production ? "https://plantio-staging.herokuapp.com/app/plant/getData" : "http://localhost:3000/app/plant/getData";
    return this._http.get(url, {
      params: {
        plantId: plantId,
        dateFrom: dateFrom,
        dateTo: dateTo
      }
    });
  }
}