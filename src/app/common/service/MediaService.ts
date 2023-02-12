import { Injectable } from '@angular/core';
import { ApiService } from './ApiService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { IMedia } from '../interfaces/IMedia';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private readonly _baseUrl = '/media';

  constructor(
    private readonly _apiService: ApiService
  ) {
  }

  public getAllMedia(): Observable<IMedia[]> {
    return this._apiService.get(this._baseUrl)
  }
}
