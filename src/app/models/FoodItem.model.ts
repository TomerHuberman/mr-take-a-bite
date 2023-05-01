export class FoodItem {
  constructor(
      public name: string = '',
      public price: number = 20,
      public imgUrl: string = '',
      public _id?: string
  ) {}

  setId?(id: string = 'r101') {
    // Implement your own set Id
    this._id = id;
  }
}

export interface FoodItemFilter {
  term: string
}