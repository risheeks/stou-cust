import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFilterComponent } from './food-filter.component';

describe('FoodFilterComponent', () => {
  let component: FoodFilterComponent;
  let fixture: ComponentFixture<FoodFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodFilterComponent]
    });
    fixture = TestBed.createComponent(FoodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
