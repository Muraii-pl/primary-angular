import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading$ = new BehaviorSubject<boolean>(false)
  constructor(private readonly _appRef: ApplicationRef) { }

  public show(): void {
    this._isLoading$.next(true)
  }

  public hide(): void {
    this._isLoading$.next(false)
    this._appRef.tick();
  }

  public getLoaderStatus(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
}
