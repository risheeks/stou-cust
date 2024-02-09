import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  
  constructor(private customerService: CustomerService, private toastr: ToastrService, private router: Router, private builder: FormBuilder) { }

  register = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    aboutMe: this.builder.control(''),
    picture: this.builder.control(''),
    address: this.builder.control(''),
    rating: this.builder.control(''),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required])),
    specialty: this.builder.array([]),
    status: this.builder.control(0),
    orderHistory: this.builder.array([])
  });

  onSubmit = () => {
    let customer: Customer = this.register.value as Customer;
    if (this.register.valid) {
      this.customerService.registerUser(customer).subscribe(() => {
        this.router.navigate(['login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  };
}
