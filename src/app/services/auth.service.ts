import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl='https://localhost:44342/api/auth/';
  constructor(private httpClient:HttpClient) { }
  helper = new JwtHelperService();

  login(loginModel:LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  logout(){
    localStorage.removeItem("token");
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  
  // emailgetirme(loginModel:LoginModel){
  //   let token=localStorage.getItem("token");
  //   let tokenEmail=this.helper.decodeToken(token);
  //   if(tokenEmail["email"]===loginModel.email)
  //   {
  //     console.log("listele")
  //   }
  // }

}
