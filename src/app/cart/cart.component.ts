import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { concatMapTo } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any[] = [];
  total: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    // this.items = [{name:'test name', price:'100'},{name:'test name2', price:'110'}];
    this.total = this.getTotal();
    console.log(this.items.length);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.items = [];
    this.total = this.getTotal();
  }

  getTotal = (): number => {
    let total: number = 0;
    console.log(this.items);
    this.items.forEach((item) => {
      total += +(item.price);
    });
    return total;
  };
  
}