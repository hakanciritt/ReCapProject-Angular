import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = environment.apiUrl + "colors/";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath=this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  add(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  delete(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  getById(id:number):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl + "getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
  update(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
