import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemDetailsComponent } from './food-item-details.component';

describe('FoodItemDetailsComponent', () => {
  let component: FoodItemDetailsComponent;
  let fixture: ComponentFixture<FoodItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
