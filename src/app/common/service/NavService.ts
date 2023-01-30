import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { Observable, Subject } from 'rxjs';
import { INavigationList } from '../interfaces/INavigationList';
import { IPost } from '../interfaces/IPost';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private readonly _baseUrl = '/categories'
  private _navList = new Subject<INavigationList[]>();

  constructor(
    private readonly _apiService: ApiService
  ) { }

  public getAllCategories(): Observable<INavigationList[]> {
    return this._apiService.get(`${this._baseUrl}`)
  }

  public getCategoryById(id: number): Observable<any> {
    return this._apiService.get(`${this._baseUrl}/${id}`)
  }

  public getCategoryBySlug(slug: string): Observable<IPost[]> {

    const param = new HttpParams( {
      fromObject: {
        slug: slug
      }
    })
    return this._apiService.get(`${this._baseUrl}`, param)
  }

  public setNavList(navList: INavigationList[]): void {
    this._navList.next(navList);
  }

  public getNavList(): Observable<INavigationList[]> {
    return this._navList.asObservable();
  }

}
