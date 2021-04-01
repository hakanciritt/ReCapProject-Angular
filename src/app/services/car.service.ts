import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment'
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { CarAdd } from '../models/car-add';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + "cars/getall");
  }
  getCarDetails(brandId: number, colorId: number) {
    let newPath = this.apiUrl + "cars/getbycolorandbrandid?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetail(carId: number) {
    let newPath = this.apiUrl + "cars/getbycarid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  add(car: CarAdd): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  getById(id: number): Observable<SingleResponseModel<CarAdd>> {
    let newPath = this.apiUrl + "cars/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<CarAdd>>(newPath);
  }
  update(car:CarAdd):Observable<ResponseModel>{
    let newPath=this.apiUrl  + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
}
