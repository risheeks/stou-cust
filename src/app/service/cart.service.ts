import { Injectable } from '@angular/core';
import { Food } from '../model/food';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OrderFood } from '../model/order-food';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: OrderFood[] = [];
  private foods: Food[] = [];
  private numOfCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private foodService: FoodService) {}

  addToCart(item: Food): void {
    let index = this.getIndex(item);
    if(index == -1) {
      let orderFood: OrderFood = new OrderFood();
      orderFood.foodId = (item.foodId ? item.foodId : -1);
      orderFood.quantity = 1;
      item.quantity = 1;
      this.foods.push(item);
      this.items.push(orderFood);
    } else {
      this.foods[index].quantity = this.foods[index].quantity+1;
      this.items[index].quantity = this.items[index].quantity + 1;
    }
    this.numOfCartItems.next(this.numOfCartItems.getValue()+1);
    // console.log(this.items);
  }

  getCartItems(): Observable<number> {
    return this.numOfCartItems.asObservable();
  }

  getIndex(item: Food) {
    let index: number = this.items.findIndex(item1 => item1.foodId === item.foodId);
    return index;
  }

  getTotal(): number {
    let total = 0;
    this.foods.forEach(food => {
      total = total + (food.price * food.quantity);
    })
    return total;
  }

  removeItem(orderFood: OrderFood): any {
    let index = this.items.findIndex(item => item.foodId === orderFood.foodId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.foods.splice(index, 1);
      this.numOfCartItems.next(this.numOfCartItems.getValue()-orderFood.quantity);
    }
    // console.log(this.items);
  }

  getItems(): OrderFood[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    this.foods = [];
    this.numOfCartItems.next(0);
  }
}