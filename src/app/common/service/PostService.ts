import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { HttpParams } from '@angular/common/http';
import { Observable, Subject, UnaryFunction } from 'rxjs';
import { ICategoryPost } from '../interfaces/ICategoryPost';
import { IPost } from '../interfaces/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly _baseUrl = '/posts'

  private _subMenuList: Subject<IPost[]> = new Subject();
  constructor(
    private readonly _apiService: ApiService
  ) { }

  public getPostListByCategoryId(id: number): Observable<ICategoryPost[]> {

    const param = new HttpParams({
      fromObject: {
        categories: id
      }
    })

    return this._apiService.get(`${this._baseUrl}`, param)
  }

  public getPinnedPost(): Observable<IPost[]> {

    const param = new HttpParams( {
      fromObject: {
        sticky: true,
        per_page: 5,
        _embed:""

      }
    })
    return this._apiService.get(`${this._baseUrl}`, param)
  }

  public setSubMenuList(subMenuList: IPost[]): void {
    this._subMenuList.next(subMenuList);
  }

  public getSubMenuList(): Observable<IPost[]> {
    return this._subMenuList.asObservable();
  }

  public getPostDetails(id: number) : Observable<IPost> {

    const param = new HttpParams( {
      fromObject: {
        _embed:""
      }
    })

    return this._apiService.get(`${this._baseUrl}/${id}`, param)
  }
}
