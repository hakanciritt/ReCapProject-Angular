import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  token: any;
  name: string;
  roles: [];
  userId: any;

  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "auth/login", loginModel);
  }
  register(registerModule: RegisterModel) {
    let newPath = this.apiUrl + "auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModule);
  }
  logout() {
    this.localStorageService.remove("token");
  }
  isAuthenticated() {
    if (this.localStorageService.get("token")) {
      return true;
    } else {
      return false;
    }
  }
  getUser() {
    const decodeToken = this.jwtHelper.decodeToken(this.getToken()?.toString());
    return decodeToken;
  }

  getToken() {
    return this.localStorageService.get("token");
  }
  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
}
