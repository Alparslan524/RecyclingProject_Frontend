import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { Person } from '../models/person';
import { PersonType } from '../models/personType';

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {
  apiUrl = 'https://localhost:44342/api/persontypes/getall';

  constructor(private httpClient: HttpClient) { }

  getPersonType():Observable<ListResponseModel<PersonType>> {
    return this.httpClient.get<ListResponseModel<PersonType>>(this.apiUrl);
  }
}
