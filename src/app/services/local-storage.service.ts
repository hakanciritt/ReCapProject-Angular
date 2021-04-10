import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  add(key: string, item: string) {
    localStorage.setItem(key, item);
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }
}
