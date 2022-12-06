import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../models/customer';
import { Garbage } from '../models/garbage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class GarbageService {
  apiUrl='https://localhost:44342/api/garbages/getall';

  constructor(private httpClient: HttpClient) { }
  getGarbages():Observable<ListResponseModel<Garbage>> {
    return this.httpClient.get<ListResponseModel<Garbage>>(this.apiUrl);
  }
}
