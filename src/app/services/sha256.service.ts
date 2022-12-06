import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { SHA256 } from '../models/sHA256';


@Injectable({
  providedIn: 'root'
})
export class Sha256Service {
  apiUrl = 'https://localhost:44342/api/sha256s/getall';
  
  constructor(private httpClient: HttpClient) { }

  getSha256():Observable<ListResponseModel<SHA256>> {
    return this.httpClient.get<ListResponseModel<SHA256>>(this.apiUrl);
  }
}
