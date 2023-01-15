import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = new BehaviorSubject<boolean>(false)
  constructor() { }

  public show(): void {
    this.isLoading.next(true)
  }

  public hide(): void {
    this.isLoading.next(false)
  }

  public getLoaderStatus(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
