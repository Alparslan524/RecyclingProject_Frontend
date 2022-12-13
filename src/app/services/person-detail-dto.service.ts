import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { PersonDetailDto } from '../models/personDetailDto';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailDtoService {
  apiUrl="https://localhost:44342/api/customers/getpersonaldetails"
  constructor(private httpClient: HttpClient) { }
  
  
  getPersonDetail():Observable<ListResponseModel<PersonDetailDto>> {
    return this.httpClient.get<ListResponseModel<PersonDetailDto>>(this.apiUrl);
  }
}
