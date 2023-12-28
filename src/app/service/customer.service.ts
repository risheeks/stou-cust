import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiurl='http://localhost:3000/customers';
  @Output() getIsLoggedIn: EventEmitter<any> = new EventEmitter();
  constructor(private http:HttpClient) { 

  }

  registerUser(customer: any) {
    return this.http.post(this.apiurl,customer)
  }

  getCustomerByUsername (username: String): Observable<any> {
    return this.http.get(this.apiurl + '?username=' + username);
  }

  login(customer: any): Boolean {
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

  getLoggedInCook(): any {
    if (sessionStorage.getItem('customer'))
      return JSON.parse(sessionStorage.getItem('customer') || "");
    else 
      return "";
  }

}
