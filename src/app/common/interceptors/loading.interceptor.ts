import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../service/LoaderService';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private _totalRequests = 0;

  constructor(
    private readonly _loaderService: LoaderService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._totalRequests++;
    this._loaderService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this._totalRequests--;
        if (this._totalRequests === 0) {
          this._loaderService.hide();
        }
      })
    );
  }
}
