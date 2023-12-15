import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookService {
  apiurl='http://localhost:3000/cooks';
  @Output() getIsLoggedIn: EventEmitter<any> = new EventEmitter();
  constructor(private http:HttpClient) { 

  }

  registerUser(cook: any) {
    return this.http.post(this.apiurl,cook)
  }

  getCookByUsername (username: String): Observable<any> {
    return this.http.get(this.apiurl + '?username=' + username);
  }

  login(cook: any): Boolean {
    if(sessionStorage.getItem('cook')!=null) {
      return false;
    } else {
      // console.log(cook);
      sessionStorage.setItem('cook', JSON.stringify(cook));
      this.getIsLoggedIn.emit(true);
      return true;
    }
  }

  logout(): Boolean {
    if(sessionStorage.getItem('cook')==null) {
      return false;
    }
    else {
      sessionStorage.clear();
      this.getIsLoggedIn.emit(false);
      return true;
    }
  }

  isLoggedIn():any {
    return sessionStorage.getItem('cook')!=null;
  }

  getLoggedInCook(): any {
    if (sessionStorage.getItem('cook'))
      return JSON.parse(sessionStorage.getItem('cook') || "");
    else 
      return "";
  }

}
