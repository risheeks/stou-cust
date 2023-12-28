import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login!: FormGroup;
  customer: any;

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
      this.customerService.getCustomerByUsername(this.login.value.username).subscribe((customer: any) => {
        this.customer = customer[0];
        if(this.customer.password == this.login.value.password) {
          this.customerService.login(this.customer);
          this.router.navigate(['dashboard']);
        } else {
          this.toastr.error('Invalid Credentials');
        }
      })
    } else {
      
    }
    // console.log('Valid?', this.login.valid); // true or false
    // console.log('Username', this.login.value.username);
    // console.log('Password', this.login.value.password);
  }
}
