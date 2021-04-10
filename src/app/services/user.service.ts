import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getByMail(email: string) {
    let newPath = this.apiUrl + "users/getbymail?email=" + email;
    return this.httpClient.get<SingleResponseModel<UserModel>>(newPath);
  }
}
