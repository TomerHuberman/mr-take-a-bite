import { Timestamp } from 'rxjs';

export class User {
  constructor(
    public _id: string,
    public name: string,
    public balance: number,
    public purchases: purchase[] = []
  ) {}
}

export interface purchase {
  itemName: string;
  itemId: string;
  cost: number;
  at: number;
}
