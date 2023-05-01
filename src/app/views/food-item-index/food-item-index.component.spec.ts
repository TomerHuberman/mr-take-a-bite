import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemIndexComponent } from './food-item-index.component';

describe('FoodItemIndexComponent', () => {
  let component: FoodItemIndexComponent;
  let fixture: ComponentFixture<FoodItemIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodItemIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodItemIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
