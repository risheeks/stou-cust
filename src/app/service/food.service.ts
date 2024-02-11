import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../model/food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  apiurl='http://localhost:8080/food';
  constructor(private http:HttpClient) { }

  getAllFood(): Observable<any> {
    return this.http.get(this.apiurl);
  }

  getFoodById(foodId: number): Observable<any> {
    return this.http.get(this.apiurl + "/" + foodId);
  }

}
