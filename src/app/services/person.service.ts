import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/listResponseModel';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  apiUrl = 'https://localhost:44342/api/persons/getall';

  constructor(private httpClient: HttpClient) { }

  getPersons():Observable<ListResponseModel<Person>> {
    return this.httpClient.get<ListResponseModel<Person>>(this.apiUrl);
  }
}
