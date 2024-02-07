import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer, Role } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiurl='http://localhost:8080/user';
  @Output() getIsLoggedIn: EventEmitter<any> = new EventEmitter();
  constructor(private http:HttpClient) {}

  registerUser(customer: Customer) {
    return this.http.post(this.apiurl,customer)
  }

  getCustomerByUsername (username: String): Observable<Customer> {
    return this.http.get(this.apiurl + '?username=' + username);
  }

  authenticateLogin (customer: Customer): Observable<Boolean> {
    customer.role = new Role();
    return this.http.post<Boolean>(this.apiurl + '/authenticate', customer);
  }

  login(customer: Customer): Boolean {
    if(sessionStorage.getItem('customer')!=null) {
      return false;
    } else {
      // console.log(cook);
      sessionStorage.setItem('customer', JSON.stringify(customer));
      this.getIsLoggedIn.emit(true);
      return true;
    }
  }

  logout(): Boolean {
    if(sessionStorage.getItem('customer')==null) {
      return false;
    }
    else {
      sessionStorage.clear();
      this.getIsLoggedIn.emit(false);
      return true;
    }
  }

  isLoggedIn():any {
    return sessionStorage.getItem('customer')!=null;
  }

  getLoggedInCook(): Customer {
    return JSON.parse(sessionStorage.getItem('customer') || "");
  }

}
