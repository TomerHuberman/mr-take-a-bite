import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';
import { FoodItem } from 'src/app/models/FoodItem.model';
import { User, purchase } from 'src/app/models/user.model';
import { FoodItemService } from 'src/app/services/food-item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'food-item-details',
  templateUrl: './food-item-details.component.html',
  styleUrls: ['./food-item-details.component.scss'],
})
export class FoodItemDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private foodItemService: FoodItemService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  foodItem$!: Observable<FoodItem>;
  user: User | null = this.userService.getLoggedInUser();
  isModalOpen = false;
  purchases: purchase[] = [];
  subscription!: Subscription;
  foodItemId!: string;
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.foodItemId = params['id']));
    this.foodItem$ = this.route.data.pipe(map((data) => data['foodItem']));
    this.subscription = this.userService.loggedInUser$
      .pipe(
        map((user) => user?.purchases),
        map((purchases) => {
          return purchases?.filter(
            (purchase) => purchase.itemId === this.foodItemId
          );
        })
      )
      .subscribe((purchases) => (this.purchases = purchases || []));
  }

  buyItem(id: string, name: string, price: number) {
    this.userService.purchaseItem(id, name, price);
    this.isModalOpen = false;
  }

  onBack() {
    this.router.navigateByUrl('/items');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
