import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CarbonToKyc } from '../models/carbonToKYC';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarbonToKycService {
  apiUrl = 'https://localhost:44342/api/carbontokycs/';
  

  constructor(private httpClient: HttpClient) { }

  getCarbonToKycs():Observable<ListResponseModel<CarbonToKyc>> {
    return this.httpClient.get<ListResponseModel<CarbonToKyc>>(this.apiUrl+"getall");
  }


  update(carbonToKYC:CarbonToKyc):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",carbonToKYC)
  }
}
