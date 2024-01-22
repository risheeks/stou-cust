import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  apiurl='http://localhost:3000/foods';
  constructor(private http:HttpClient) { }

  getAllFood(): any {
    return this.http.get(this.apiurl);
  }
}
