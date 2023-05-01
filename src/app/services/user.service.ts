import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, purchase } from '../models/user.model';
import { UtilService } from './util.service';
import { syncStorageService } from './storage.service';
const ENTITY = 'users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = null;
  users: User[];
  constructor(
    private utilService: UtilService,
    private storageService: syncStorageService
  ) {
    this.users = storageService.load(ENTITY);
  }

  private _loggedInUser$ = new BehaviorSubject(this.user);
  // private _loggedInUser$ = new BehaviorSubject(null)
  public loggedInUser$ = this._loggedInUser$.asObservable();

  public getLoggedInUser() {
    this.user = JSON.parse(sessionStorage.getItem('user') || 'null') || null;
    this._loggedInUser$.next(this.user);
    return this._loggedInUser$.value;
  }

  public signup(name: string) {
    this.user = new User(this.utilService.getRandomId(), name, 100);
    this.users = [...this.users, { ...this.user }];
    this.storageService.save(ENTITY, this.users);
    this.login(name);
  }

  public login(name: string) {
    const user = this.users.find((user) => user.name === name);
    if (!user) return;
    this.user = user;
    this._loggedInUser$.next(this.user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public logout() {
    this.user = null;
    sessionStorage.clear();
    this._loggedInUser$.next(this.user);
  }

  public purchaseItem(id: string, name: string, price: number) {
    if (!this.user) return;
    this.user.balance -= price;
    const purchase: purchase = {
      itemId: id,
      itemName: name,
      cost: price,
      at: Date.now(),
    };
    this.user.purchases = [purchase, ...this.user.purchases];
    this.users = this.users.filter((user) =>
      user._id === this.user?._id ? this.user : user
    );
    this.storageService.save(ENTITY, this.users);
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this._loggedInUser$.next(this.user);
  }
}
