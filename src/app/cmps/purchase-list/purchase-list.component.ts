import { Component, Input } from '@angular/core';
import { purchase } from 'src/app/models/user.model';

@Component({
  selector: 'purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss'],
})
export class PurchaseListComponent {
  @Input() purchases!: purchase[];
  @Input() title: string = '';
}
