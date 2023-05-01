import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FoodItemFilter } from 'src/app/models/FoodItem.model';
import { FoodItemService } from 'src/app/services/food-item.service';

@Component({
  selector: 'food-item-filter',
  templateUrl: './food-item-filter.component.html',
  styleUrls: ['./food-item-filter.component.scss'],
})
export class FoodItemFilterComponent implements OnInit, OnDestroy {
  constructor(private foodItemService: FoodItemService) {}
  destroySubject$ = new Subject<null>();
  filterSubject$ = new Subject();
  foodItemFilter = {} as FoodItemFilter;

  ngOnInit(): void {
    this.foodItemService.foodItemFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((foodItemFilter) => {
        this.foodItemFilter = foodItemFilter;
      });

    this.filterSubject$
      .pipe(
        takeUntil(this.destroySubject$),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.foodItemService.setFilter(this.foodItemFilter);
      });
  }

  onSetFilter(val: string) {
    this.filterSubject$.next(val);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
}
