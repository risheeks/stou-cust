import { Component, Input } from '@angular/core';
import { Food } from '../model/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {
  @Input() food?: Food;
}
