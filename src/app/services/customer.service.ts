import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44342/api/customers';

  constructor(private httpClient: HttpClient) { }

  getCustomer():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl+"/getall");
  }

  updateById(carbonValue:number,id:number):Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/updateById?carbonValue="+carbonValue+"&id="+id, null)
    }
  
  //https://localhost:44342/api/customers/updateById?carbonValue=3145&id=2

 update(customer:Customer):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",customer)
  }
}
