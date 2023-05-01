import { Component } from '@angular/core';
import { FoodItemService } from './services/food-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mr-bitcoin-angular';

  constructor(private FoodItemService: FoodItemService) {}
  ngOnInit() {
    this.FoodItemService.loadFoodItems().subscribe({
      error: (err) => console.log('err: ', err),
    });
  }
}
