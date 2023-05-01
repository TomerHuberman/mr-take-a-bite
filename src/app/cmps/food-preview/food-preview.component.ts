import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from 'src/app/models/FoodItem.model';

@Component({
  selector: 'food-preview',
  templateUrl: './food-preview.component.html',
  styleUrls: ['./food-preview.component.scss'],
})
export class FoodPreviewComponent {
  @Input() foodItem!: FoodItem ;
  @Output() remove = new EventEmitter<string>()

  onRemoveItem() {
    this.remove.emit(this.foodItem._id)
  }
}
