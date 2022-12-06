import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CarbonToKyc } from '../models/carbonToKYC';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarbonToKycService {
  apiUrl = 'https://localhost:44342/api/carbontokycs/getall';
  
  constructor(private httpClient: HttpClient) { }

  getCarbonToKycs():Observable<ListResponseModel<CarbonToKyc>> {
    return this.httpClient.get<ListResponseModel<CarbonToKyc>>(this.apiUrl);
  }
}
