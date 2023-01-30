import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, pluck } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabIndexService {
  private _isNavOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private _tabIndexNavIsOpen = {
    logo: 1,
    navButton: 1,
    navItem: 2,
    subMenuItem: -1,
    footerItem: -1,
  }
  private _tabIndexNavIsClose = {
    logo: 1,
    navButton: 1,
    navItem: 2,
    subMenuItem: 3,
    footerItem: 4,
  }

  private _tabIndex: BehaviorSubject<{[key: string]: number}> =
    new BehaviorSubject<{[p: string]: number}>(this._tabIndexNavIsClose)
  constructor() { }

  public getTabIndex(item: string): Observable<number> {
    return this._tabIndex.pipe(map(element => element[item]))
  }

  public setNavOpen(isNavOpen): void {
    this._tabIndex.next(isNavOpen ? this._tabIndexNavIsOpen : this._tabIndexNavIsClose)
    this._isNavOpen.next(isNavOpen);
  }

}
