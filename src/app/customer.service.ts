import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Customer} from './customer';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'customers-list');
  }

  createCustomer(customer: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'save-customer', customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-customer/${id}`, { responseType: 'text' });
  }
  getCustomer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/${id}`);
  }
  updateCustomer(id: number, value: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-customer/${id}`, value);
  }
  }
