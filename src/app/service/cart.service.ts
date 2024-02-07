import { Injectable } from '@angular/core';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Food[] = [];

  addToCart(item: Food): void {
    this.items.push(item);
  }

  getItems(): Food[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }
}