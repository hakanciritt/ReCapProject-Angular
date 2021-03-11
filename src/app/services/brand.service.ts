import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { BrandResponseModel } from '../models/brandResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44312/api/brands/getall";
  brands: Brand[] = [];

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<BrandResponseModel> {

    return this.httpClient.get<BrandResponseModel>(this.apiUrl);
  }

}
