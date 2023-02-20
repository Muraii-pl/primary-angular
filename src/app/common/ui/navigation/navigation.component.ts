import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { INavigation } from '../../interfaces/INavigation';
import { NavService } from '../../service/NavService';
import { map } from 'rxjs';
import { INavigationList } from '../../interfaces/INavigationList';
import { NavigationTileComponent } from '../navigation-tile/navigation-tile.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @ViewChild('navRef') navRef: ElementRef
  public navList: INavigation[];
  @ViewChildren('navItemRef') navItemQueryList: QueryList<NavigationTileComponent>
  public readonly staticNavList: INavigation[] = [
    {
      name: 'Kontakt',
      id: 0,
      slug: 'kontakt',
      isLink: false,
      isPage: true
    },
    {
      name: 'E-dziennik',
      id: 0,
      slug: 'https://cufs.vulcan.net.pl/gminahazlach/Account/LogOn',
      isLink: true
    }
  ]
  public isNavOpen = false;

  constructor(
    private readonly _navService: NavService,
    private readonly _cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.getCategories();
  }

  public ngAfterViewInit(): void {
    this.navItemQueryList.changes.subscribe(() => this.toggleAllNavigationList());
  }

  public toggleNavigation(isNavOpen: boolean): void {
    this.isNavOpen = isNavOpen;
    const body = document.querySelector('body')
    if (this.isNavOpen) {
      this.navRef.nativeElement.scrollIntoView({ behavior: 'smooth' })
      body.classList.add('navIsOpen')
    } else {
      body.classList.remove('navIsOpen')
    }
  }

  private getCategories(): void {
    this._navService.getAllCategories().pipe(
      map((res: INavigationList[]) => {
        return res.map((category: INavigationList) => {
          return {
            name: category['name'],
            id: category['id'],
            slug: category['slug']
          }
        })
      }))
    .subscribe((categories: INavigation[]) => {
      this._navService.setNavList(categories)
      this.navList = categories.concat(this.staticNavList)
      .filter(navItem => navItem['slug'] !== 'bez-kategorii' && navItem['slug'] !== 'sub-menu');
    })
  }

  private toggleAllNavigationList(): void {
    for (const currentNavItem of this.navItemQueryList) {
      currentNavItem.onToggle.subscribe((isOpened: boolean) => {
        if (isOpened) {
          this.navItemQueryList.forEach((navItem: NavigationTileComponent) => {
            if (navItem !== currentNavItem) {
              navItem.close()
            }
          })
        }
      })
    }
  }
}
