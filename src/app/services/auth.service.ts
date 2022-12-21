import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { last } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl='https://localhost:44342/api/auth/';
  apiUrlMernis='https://localhost:44342/api/TC/tcdogrula?';
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
  
  getEmail(){
    let token=localStorage.getItem("token");
    let tokenEmail=this.helper.decodeToken(token);
    return tokenEmail["email"];
  }

  mernis(name:string,lastName:string,identityNumber:number,birthDate:number) {
    return this.httpClient.get<SingleResponseModel<string>>(this.apiUrlMernis+"name="+name+"&lastName="+lastName+"&identityNumber="+identityNumber+"&birthDate="+birthDate)
  }


}
// https://localhost:44342/api/TC/tcdogrula?name=Alparslan&lastName=Aydoğan&identityNumber=66106278118&birthDate=2002