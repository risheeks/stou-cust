import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../service/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedIn?: boolean;

  constructor(private customerService: CustomerService, private router: Router, private toastr: ToastrService, private cartService: CartService, private dialog: MatDialog) {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.customerService.getIsLoggedIn.subscribe(isLoggedIn => 
      this.loggedIn = isLoggedIn
    )
  }

  logout() {
    if(this.customerService.logout()) {
      this.router.navigate([""]);
      this.toastr.success("logged out");
    }
  }

  toggleCart() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The cart pop-up was closed');
    });
  }
  
}
