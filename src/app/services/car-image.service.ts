import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImages } from '../models/car-images';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getByCarId(id: Number): Observable<CarImages> {
    let newPath = this.apiUrl + "carimages/getbycarid?id=" + id;
    return this.httpClient.get<CarImages>(newPath);
  }
}
