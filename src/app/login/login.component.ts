import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login!: FormGroup;
  customer?: Customer;

  constructor(private toastr: ToastrService, private customerService: CustomerService, private router: Router) {
    sessionStorage.clear();
  }

  ngOnInit() {
    this.login = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit() {

    if(this.login.valid) {
      this.customerService.authenticateLogin(this.login.value).subscribe((validLogin: Boolean) => {
        if(validLogin) {
          let customer = this.customerService.getCustomerByUsername(this.login.value.email).subscribe(customer => {
            this.customerService.login(customer);
            this.router.navigate(['dashboard']);
          });
        } else {
          this.toastr.error('Invalid Credentials');
        }
      })
    } else {
      this.toastr.error('Invalid Form');
    }
  }
}
