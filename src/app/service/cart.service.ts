import { Injectable } from '@angular/core';
import { Food } from '../model/food';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderFood } from '../model/order-food';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: OrderFood[] = [];
  private numOfCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private foodService: FoodService) {}

  addToCart(item: Food): void {
    console.log(item)
    let index = this.getIndex(item);
    if(index == -1) {
      let orderFood: OrderFood = new OrderFood();
      orderFood.foodId = (item.foodId ? item.foodId : -1);
      orderFood.quantity = 1;
      this.items.push(orderFood);
    } else {
      this.items[index].quantity = this.items[index].quantity + 1;
    }
    this.numOfCartItems.next(this.numOfCartItems.getValue()+1);
    console.log(this.items);
  }

  getCartItems() {
    return this.numOfCartItems.asObservable();
  }

  getIndex(item: Food) {
    let index: number = this.items.findIndex(item1 => item1.foodId === item.foodId);
    return index;
  }

  // cartContains(item: Food): Boolean {
  //   let contains: Boolean = false;
  //   this.items.forEach((item1: Food) => {
  //     if(item.foodId === item1.foodId) contains = true;
  //   });
  //   return contains;
  // }

  removeItem(orderFood: OrderFood): any {
    let index = this.items.findIndex(item => item.foodId === orderFood.foodId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.numOfCartItems.next(this.numOfCartItems.getValue()-orderFood.quantity);
    }
    console.log(this.items);
  }

  getItems(): OrderFood[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    this.numOfCartItems.next(0);
  }
}