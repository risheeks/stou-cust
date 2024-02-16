import { Component } from '@angular/core';
import { OrderFood } from '../model/order-food';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  items: OrderFood[] = [];
  // total: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    // this.cartService.getTotal().subscribe(total => {
    //   this.total = total;
    // });
    // console.log(this.items);
  }

}
