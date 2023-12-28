import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CustomerService } from "../service/customer.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private customerService: CustomerService, private router: Router,private tostr:ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    console.log(route);
    if (this.customerService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}