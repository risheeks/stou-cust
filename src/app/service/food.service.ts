import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../model/food';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  apiurl='http://localhost:8080/food';
  constructor(private http: HttpClient, private customerService: CustomerService) { }

  getAllFood(): Observable<any> {
    return this.http.get(this.apiurl);
  }

  getFoodById(foodId: number): Observable<any> {
    return this.http.get(this.apiurl + "/" + foodId);
  }

  sendOrder(orderFoods: any[]) {
    let order: Order = new Order();
    order.cookEmail = orderFoods[0].cookEmail;
    order.customerEmail = this.customerService.getLoggedInCustomer().email;
    order.deliveryAddress = "";
    order.items = orderFoods; 
    console.log(order);
    return this.http.get('http://localhost:8080/payment');
  }
}
