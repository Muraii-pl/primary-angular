import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly _http: HttpClient
  ) { }


  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.get(
      `${environment.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors))
  }

  public post(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body), {
        params,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(catchError(this.formatErrors))
  }

  private formatErrors(error: any) {
    return throwError(error.error)
  }
}
