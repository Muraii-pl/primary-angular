import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
