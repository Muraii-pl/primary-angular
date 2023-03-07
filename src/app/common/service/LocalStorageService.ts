import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
  ) { }

  public getValue(key: string): string {
    return localStorage.getItem(key)
  }

  public setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

}
