import { Component } from '@angular/core';
import { FoodService } from '../service/food.service';
import { CartService } from '../service/cart.service';
import { Food } from '../model/food';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  
  foodList: Food[] = [];

  constructor(private foodService: FoodService, private cartService: CartService) {}

  ngOnInit() {
    this.foodService.getAllFood().subscribe((foodsList: any) => {
      this.foodList = foodsList;
      // console.log(this.foodList);
    });
  }

  addToCart(foodItem: Food) {
    this.cartService.addToCart(foodItem);
  }

}
