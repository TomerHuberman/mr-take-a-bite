import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from 'src/app/models/FoodItem.model';

@Component({
  selector: 'food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent {
  
  @Input() fooditems!: FoodItem[] | null;
  @Output() remove = new EventEmitter<string>()

}
