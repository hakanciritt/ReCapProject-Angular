import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44312/api/";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + "cars/getall");
  }
  getCarsById(brandId: number) {
    let newPath = this.apiUrl + "cars/getbyid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColorName(colorName: string) {
    let newPath = this.apiUrl + "cars/getbyid?colorName=" + colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
