import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryPost } from '../interfaces/ICategoryPost';
import { IPost } from '../interfaces/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly _baseUrl = '/posts'
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
        sticky: true
      }
    })
    return this._apiService.get(`${this._baseUrl}`, param)
  }
}
