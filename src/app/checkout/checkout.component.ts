import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { OrderService } from '../service/order.service';
import { Food } from '../model/food';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  items: Food[] = [];
  public payPalConfig ? : IPayPalConfig;

  total!: number;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.items = this.cartService.getFoods();
    this.total = this.cartService.getTotal();

    // this.orderService.sendOrder(this.items);
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'AYUegbSGHDIK59e91va58eMq4wWuuHsrpwo0W_82zIKptXiPqVXVLUvsvqvCvO-anIz6oHsW7EPmKdo6',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.total.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.total.toString()
                        }
                    }
                }
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
            this.onAuthorization();
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
  }

  onAuthorization() {
    this.router.navigate(['tracking']);
    this.orderService.sendOrder(this.items);
    
  }
}
