import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodFilterComponent } from '../food-filter/food-filter.component';


export interface FilterData {
  price: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
}) 
export class DashboardComponent {

  data: FilterData={
    price:2000
  };

  constructor(public dialog:MatDialog) {}

  openFilters() {
    console.log(this.data.price);
    const dialogRef = this.dialog.open(FoodFilterComponent, {
      data: {price: this.data.price},
      width: '30%',
      height: '20%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Filter dialog was closed');
      this.data.price = result;
      console.log(this.data.price);
    });
  }
}
