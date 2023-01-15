import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { Observable } from 'rxjs';
import { INavigationList } from '../interfaces/INavigationList';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private readonly _baseUrl = '/categories'

  constructor(
    private readonly _apiService: ApiService
  ) { }

  public getAllCategories(): Observable<INavigationList[]> {
    return this._apiService.get(`${this._baseUrl}`)
  }

  public getCategoryById(id: number): Observable<any> {
    return this._apiService.get(`${this._baseUrl}/${id}`)
  }
}
