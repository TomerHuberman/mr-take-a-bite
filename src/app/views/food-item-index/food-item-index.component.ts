import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FoodItem } from 'src/app/models/FoodItem.model';
import { FoodItemService } from 'src/app/services/food-item.service';

@Component({
  selector: 'food-item-index',
  templateUrl: './food-item-index.component.html',
  styleUrls: ['./food-item-index.component.scss'],
})
export class FoodItemIndexComponent implements OnInit {
  constructor(private FoodItemService: FoodItemService) {}
  subscription!: Subscription;
  fooditems: FoodItem[] | null = null;
  fooditems$!: Observable<FoodItem[]>;

  ngOnInit() {
    this.fooditems$ = this.FoodItemService.fooditems$;
    console.log('this.fooditems$ : ', this.fooditems$);
  }

  onRemoveItemFood(itemId: string) {
    this.FoodItemService.deleteFoodItem(itemId).subscribe({
      error: (err) => console.log('err:', err),
    });
  }
}
