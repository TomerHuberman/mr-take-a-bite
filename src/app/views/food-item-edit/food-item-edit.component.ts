import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { FoodItem } from 'src/app/models/FoodItem.model';
import { FoodItemService } from 'src/app/services/food-item.service';

@Component({
  selector: 'food-item-edit',
  templateUrl: './food-item-edit.component.html',
  styleUrls: ['./food-item-edit.component.scss'],
})
export class FoodItemEditComponent {
  constructor(
    private foodItemService: FoodItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  foodItem = this.foodItemService.getEmptyFoodItem() as FoodItem;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.route.data
      .pipe(
        map((data) => data['foodItem']),
        filter((foodItem) => foodItem)
      )
      .subscribe((foodItem) => (this.foodItem = foodItem));
  }

  onSaveFoodItem() {
    console.log('this.foodItem: ', this.foodItem);
    this.foodItemService.saveFoodItem(this.foodItem).subscribe({
      next: () => this.router.navigateByUrl('/items'),
      error: (err) => console.log('err:', err),
    });
  }
  onBack() {
    this.router.navigateByUrl('/items');
  }

  //   ngOnDestroy(): void {
  //     this.subscription?.unsubscribe()
  // }
}
