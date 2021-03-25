import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + "cars/getall");
  }
  getCarsByName(brandName: string) {
    let newPath = this.apiUrl + "cars/getbybrandname?brandName=" + brandName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColorName(colorName: string) {
    let newPath = this.apiUrl + "cars/getbycolorname?colorName=" + colorName;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails(brandId: number, colorId: number) {
    let newPath = this.apiUrl + "cars/getbycolorandbrandid?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
