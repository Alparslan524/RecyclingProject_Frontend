import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { SHA256 } from '../models/sHA256';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class Sha256Service {
  apiUrl = 'https://localhost:44342/api/sha256s';
  
  constructor(private httpClient: HttpClient) { }

  getSha256():Observable<ListResponseModel<SHA256>> {
    return this.httpClient.get<ListResponseModel<SHA256>>(this.apiUrl+"/getall");
  }


  getByAdress(adress:string):Observable<SingleResponseModel<SHA256>>{
    return this.httpClient.get<SingleResponseModel<SHA256>>(this.apiUrl+"/getbyadress?adress="+adress);
  }





}
