import { Component, Input, OnInit } from '@angular/core';
import { NavService } from '../../service/NavService';
import { PostService } from '../../service/PostService';
import { map } from 'rxjs';
import { ICategoryPost } from '../../interfaces/ICategoryPost';
import { INavigationItem } from '../../interfaces/INavigationItem';

@Component({
  selector: 'app-navigation-tile',
  templateUrl: './navigation-tile.component.html',
  styleUrls: ['./navigation-tile.component.less']
})
export class NavigationTileComponent implements OnInit {

  @Input() set navItemProperty(navItem) {
    const { name, slug, isLink, id, isPage } = navItem
    this.name = name;
    this.slug = slug;
    this.isLink = isLink
    this.id = id;
    this.isPage = isPage;
    if (this.id) {
      this.getSubNavList();
    }
  };

  public name: string;
  public slug: string;
  public isLink: boolean;
  public isPage: boolean;
  public id:number;
  public subMenuItems: INavigationItem [];

  constructor(
    private readonly _navService: NavService,
    private readonly _postService: PostService
  ) { }

  public ngOnInit(): void {
  }

  public getSubNavList(): void {
    this._postService.getPostListByCategoryId(this.id).pipe(
      map((res:ICategoryPost[]) => {
        return res.map((item:ICategoryPost) => {
          return {
            slug: item['slug'],
            name: item['title']['rendered'],
            isLink: true
          }
        })
      })
    ).subscribe((res: INavigationItem[]) => {
      this.subMenuItems = res;
    })
  }
}
