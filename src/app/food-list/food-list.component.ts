import { Component } from '@angular/core';
import { FoodService } from '../service/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  
  foodList: any = [];

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.foodList = this.foodService.getAllFood().subscribe((foodsList: any) => {
      this.foodList = foodsList;
      // console.log(this.foodList);
    });
  }

}