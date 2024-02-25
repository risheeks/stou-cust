import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { OrderFood } from '../model/order-food';
import { CustomerService } from './customer.service';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiurl='http://localhost:8080/order';
  constructor(private http: HttpClient, private customerService: CustomerService) { }

  sendOrder(orderFoods: Food[]) {
    let order: any = new Order();
    order.cookEmail = orderFoods[0].cookEmail;
    order.customerEmail = this.customerService.getLoggedInCustomer().email;
    order.deliveryAddress = "";
    order.items = orderFoods; 
    console.log(order);
    return this.http.post(this.apiurl, order).subscribe();
  }
}
