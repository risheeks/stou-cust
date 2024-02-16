import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { concatMapTo } from 'rxjs';
import { Food } from '../model/food';
import { OrderFood } from '../model/order-food';
import { FoodService } from '../service/food.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Food[] = [];
  total: number = 0;
  constructor(private cartService: CartService, private foodService: FoodService, private router: Router, private dialogRef: MatDialogRef<CartComponent>) {}

  ngOnInit(): void {
    this.items = [];
    let orderItems: OrderFood[] = this.cartService.getItems();
    this.total = 0;
    orderItems.forEach(item => {
      this.foodService.getFoodById(item.foodId).subscribe((food: Food) => {
        food.quantity = item.quantity;
        this.items.push(food);
        this.total = this.total + food.price * food.quantity;
      });
    });
  }

  checkout() {
    this.dialogRef.close();
    this.router.navigate(['checkout', this.items]);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.items = [];
    this.total = this.getTotal();
  }

  deleteItem(food: Food): void {
    let orderFood: OrderFood = new OrderFood();
    orderFood.foodId = (food.foodId ? food.foodId : -1);
    orderFood.quantity = (food.quantity ? food.quantity : -1);
    this.cartService.removeItem(orderFood);
    this.ngOnInit();
    
  }

  getTotal = (): number => {
    let total: number = 0;
    this.items.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    return total;
  };
  
}