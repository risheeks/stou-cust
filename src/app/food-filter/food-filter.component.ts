import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilterData } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-food-filter',
  templateUrl: './food-filter.component.html',
  styleUrls: ['./food-filter.component.css'],
})
export class FoodFilterComponent {
  constructor(
    public dialogRef: MatDialogRef<FoodFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  valueChanged(event: any) {
    console.log(event.target.value)

  }
}