import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44312/api/brands/getall";
  brands: Brand[] = [];

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {

    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
  // getCarsById(brandId: number) {
  //   let newPath = this.apiUrl + "brands/getall?brandId=" + brandId;
  //   return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  // }
  
}
