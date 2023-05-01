import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
} from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FoodItem, FoodItemFilter } from '../models/FoodItem.model';
import { UtilService } from './util.service';
const ENTITY = 'fooditems';

@Injectable({
  providedIn: 'root',
})
export class FoodItemService {
  private _fooditems$ = new BehaviorSubject<FoodItem[]>([]);
  public fooditems$ = this._fooditems$.asObservable();

  private _foodItemFilter$ = new BehaviorSubject<FoodItemFilter>({ term: '' });
  public foodItemFilter$ = this._foodItemFilter$.asObservable();

  constructor(private utilService: UtilService) {
    // Handling Demo Data, fetching from storage || saving to storage
    const fooditems = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!fooditems || fooditems.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createFoodItems()));
    }
  }

  public loadFoodItems() {
    return from(storageService.query(ENTITY)).pipe(
      tap((fooditems) => {
        const filterBy = this._foodItemFilter$.value;
        if (filterBy && filterBy.term) {
          fooditems = this._filter(fooditems, filterBy.term);
        }
        this._fooditems$.next(this._sort(fooditems));
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  public getFoodItemById(id: string): Observable<FoodItem> {
    return from(storageService.get(ENTITY, id)).pipe(
      catchError(this._handleError)
    );
  }

  public deleteFoodItem(id: string) {
    return from(storageService.remove(ENTITY, id)).pipe(
      tap(() => {
        let fooditems = this._fooditems$.value;
        fooditems = fooditems.filter((fooditem) => fooditem._id !== id);
        this._fooditems$.next(fooditems);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  public saveFoodItem(fooditem: FoodItem) {
    return fooditem._id
      ? this._updateFoodItem(fooditem)
      : this._addFoodItem(fooditem);
  }

  public setFilter(foodItemFilter: FoodItemFilter) {
    this._foodItemFilter$.next({ ...foodItemFilter });
    this.loadFoodItems().subscribe();
  }

  public getEmptyFoodItem() {
    return {
      name: '',
      price: 0,
      imgUrl: '',
    };
  }

  private _updateFoodItem(fooditem: FoodItem) {
    return from(storageService.put(ENTITY, fooditem)).pipe(
      tap((updatedFoodItem) => {
        const fooditems = this._fooditems$.value;
        this._fooditems$.next(
          fooditems.map((fooditem) =>
            fooditem._id === updatedFoodItem._id ? updatedFoodItem : fooditem
          )
        );
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  private _addFoodItem(fooditem: FoodItem) {
    const newFoodItem = new FoodItem(
      fooditem.name,
      fooditem.price,
      fooditem.imgUrl || '/src/assets/imgs/default.jpg'
    );
    if (typeof newFoodItem.setId === 'function')
      newFoodItem.setId(this.utilService.getRandomId());
    console.log('newFoodItem: ', newFoodItem);
    return from(storageService.post(ENTITY, fooditem)).pipe(
      tap((newFoodItem) => {
        const fooditems = this._fooditems$.value;
        console.log('fooditems : ', fooditems);
        this._fooditems$.next([...fooditems, newFoodItem]);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  private _sort(fooditems: FoodItem[]): FoodItem[] {
    return fooditems.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  private _filter(fooditems: FoodItem[], term: string) {
    term = term.toLocaleLowerCase();
    return fooditems.filter((fooditem) => {
      return fooditem.name.toLocaleLowerCase().includes(term);
    });
  }

  private _createFoodItems() {
    const fooditems: FoodItem[] = [
      {
        _id: '654959',
        name: 'Pasta With Tuna',
        imgUrl: 'https://spoonacular.com/recipeImages/654959-312x231.jpg',
        price: 20,
      },
      {
        _id: '511728',
        name: 'Pasta Margherita',
        imgUrl: 'https://spoonacular.com/recipeImages/511728-312x231.jpg',
        price: 20,
      },
      {
        _id: '654857',
        name: 'Pasta On The Border',
        imgUrl: 'https://spoonacular.com/recipeImages/654857-312x231.jpg',
        price: 20,
      },
      {
        _id: '654883',
        name: 'Pasta Vegetable Soup',
        imgUrl: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
        price: 20,
      },
      {
        _id: '654928',
        name: 'Pasta With Italian Sausage',
        imgUrl: 'https://spoonacular.com/recipeImages/654928-312x231.jpg',
        price: 20,
      },
      {
        _id: '654926',
        name: 'Pasta With Gorgonzola Sauce',
        imgUrl: 'https://spoonacular.com/recipeImages/654926-312x231.jpg',
        price: 20,
      },
      {
        _id: '654944',
        name: 'Pasta With Salmon Cream Sauce',
        imgUrl: 'https://spoonacular.com/recipeImages/654944-312x231.jpg',
        price: 20,
      },
      {
        _id: '654905',
        name: 'Pasta With Chickpeas and Kale',
        imgUrl: 'https://spoonacular.com/recipeImages/654905-312x231.jpg',
        price: 20,
      },
      {
        _id: '654901',
        name: 'Pasta With Chicken and Broccoli',
        imgUrl: 'https://spoonacular.com/recipeImages/654901-312x231.jpg',
        price: 20,
      },
      {
        _id: '654913',
        name: 'Pasta With Chicken and Mushrooms',
        imgUrl: 'https://spoonacular.com/recipeImages/654913-312x231.jpg',
        price: 20,
      },
      {
        _id: '654953',
        name: 'Pasta with Spicy Sausage & Rapini',
        imgUrl: 'https://spoonacular.com/recipeImages/654953-312x231.jpg',
        price: 20,
      },
      {
        _id: '654835',
        name: 'Pasta e Fagioli (Pasta and Beans)',
        imgUrl: 'https://spoonacular.com/recipeImages/654835-312x231.jpg',
        price: 20,
      },
      {
        _id: '654879',
        name: 'Pasta Roses With Zucchini and Ham',
        imgUrl: 'https://spoonacular.com/recipeImages/654879-312x231.jpg',
        price: 20,
      },
      {
        _id: '654935',
        name: 'Pasta with Peas and Italian Sausage',
        imgUrl: 'https://spoonacular.com/recipeImages/654935-312x231.jpg',
        price: 20,
      },
      {
        _id: '654911',
        name: 'Pasta With Cream Sauce and Mushrooms',
        imgUrl: 'https://spoonacular.com/recipeImages/654911-312x231.jpg',
        price: 20,
      },
      {
        _id: '1697541',
        name: 'Pasta With Feta Cheese And Asparagus',
        imgUrl: 'https://spoonacular.com/recipeImages/1697541-312x231.jpg',
        price: 20,
      },
      {
        _id: '654797',
        name: 'Pasta A La Lydia (Halloween Inspired)',
        imgUrl: 'https://spoonacular.com/recipeImages/654797-312x231.jpg',
        price: 20,
      },
      {
        _id: '686582',
        name: 'Pasta casserole with zucchini and chicken',
        imgUrl: 'https://spoonacular.com/recipeImages/686582-312x231.jpg',
        price: 20,
      },
      {
        _id: '654887',
        name: 'Pasta Shells With Ricotta Cheese Stuffing',
        imgUrl: 'https://spoonacular.com/recipeImages/654887-312x231.jpg',
        price: 20,
      },
      {
        _id: '654939',
        name: 'Pasta With Roasted Vegetables & Greek Olives',
        imgUrl: 'https://spoonacular.com/recipeImages/654939-312x231.jpg',
        price: 20,
      },
    ];
    return fooditems;
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('error in pet service:', err);
    return throwError(() => err);
  }
}

//https://api.spoonacular.com/recipes/complexSearch?apiKey=80992aaba26e4c08bbe4939aac61a5d0&query=pasta&number=20&includeNutrition=false
