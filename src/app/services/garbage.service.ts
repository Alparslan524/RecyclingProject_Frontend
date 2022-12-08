import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../models/customer';
import { Garbage } from '../models/garbage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class GarbageService {
  apiUrl='https://localhost:44342/api/';

  constructor(private httpClient: HttpClient) { }
  getGarbages():Observable<ListResponseModel<Garbage>> {
    return this.httpClient.get<ListResponseModel<Garbage>>(this.apiUrl+"garbages/getall");
  }

  add(garbage:Garbage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"garbages/add",garbage)
  }

  
  delete(garbage:Garbage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"garbages/delete",garbage)
  }

}
