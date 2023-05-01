import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemFilterComponent } from './food-item-filter.component';

describe('PetFilterComponent', () => {
  let component: FoodItemFilterComponent;
  let fixture: ComponentFixture<FoodItemFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodItemFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
