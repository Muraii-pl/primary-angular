import { Component, Input, OnInit } from '@angular/core';
import { INavigation } from '../../interfaces/INavigation';
import { ApiService } from '../../service/ApiService';
import { NavService } from '../../service/NavService';
import { filter, map } from 'rxjs';
import { INavigationList } from '../../interfaces/INavigationList';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {
  public navList: INavigation[];
  public readonly staticNavList:INavigation[] = [
    {
      name: 'Kontakt',
      id:0,
      slug:'kontakt',
      isLink: false,
      isPage: true
    },
    {
      name: 'E-dziennik',
      id:0,
      slug:'https://cufs.vulcan.net.pl/gminahazlach/Account/LogOn',
      isLink: true
    }
  ]
  public isNavOpen = false;
  constructor(
    private readonly _navService: NavService,
  ) { }

  public ngOnInit(): void {
    this.getCategories();
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
      }).filter(navItem => navItem['slug'] !== 'bez-kategorii')
    }))
    .subscribe((categories: INavigation[]) => {
      this.navList = categories.concat(this.staticNavList);
    })
  }

}
