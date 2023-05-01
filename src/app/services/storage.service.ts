import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

type Entity = User;
@Injectable({
  providedIn: 'root',
})
export class syncStorageService {
  constructor() {}

  public save(entityType: string, entities: Entity[]) {
    localStorage.setItem(entityType, JSON.stringify(entities));
  }

  public load(entityType: string) {
    return JSON.parse(localStorage.getItem(entityType) || 'null') || [];
  }
}
