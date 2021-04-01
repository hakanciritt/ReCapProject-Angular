import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Car } from '../models/car';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCarDetails(carId: Number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbycarid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
}
