import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment'
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl + "brands/";
  brands: Brand[] = [];

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "getall");
  }
  getById(id: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + "getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }
  add(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  delete(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  update(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
