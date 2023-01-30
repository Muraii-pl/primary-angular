import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavService } from '../../service/NavService';
import { PostService } from '../../service/PostService';
import { map } from 'rxjs';
import { ICategoryPost } from '../../interfaces/ICategoryPost';
import { INavigationItem } from '../../interfaces/INavigationItem';
import { TabIndexService } from '../../service/TabIndexService';

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
  @Input() isOpen = false;
  @Input() mainNavOpen = false;
  @Output() onToggle = new EventEmitter<boolean>();
  @Output() onLinkClick = new EventEmitter<boolean>();

  public name: string;
  public slug: string;
  public isLink: boolean;
  public isPage: boolean;
  public id: number;
  public subMenuItems: INavigationItem [];
  public tabIndex: number;

  constructor(
    private readonly _navService: NavService,
    private readonly _postService: PostService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _tabIndexService: TabIndexService
  ) { }

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('navItem').subscribe((tabIndex) => {
      this.tabIndex = tabIndex;
      this._cdr.detectChanges();
    })
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

  public toggle(): void {
    this.isOpen = !this.isOpen;
    this.onToggle.emit(this.isOpen)
  }

  public close(): void {
    this.isOpen = false;
    this.onToggle.emit(this.isOpen)
    this._cdr.detectChanges()
  }

}
