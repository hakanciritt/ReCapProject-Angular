import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl + "brands/getall";
  brands: Brand[] = [];

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {

    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
}
