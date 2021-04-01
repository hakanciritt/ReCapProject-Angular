import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { environment } from 'src/environments/environment'
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + "rentals/getall");
  }
  checkIfCarRent(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "rentals/checkifcarrent", rental);
  }
}
