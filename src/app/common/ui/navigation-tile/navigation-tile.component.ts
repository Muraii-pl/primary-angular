import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() set navItemProperty(navItem: INavigationItem) {
    const { name, slug, isLink, id, isPage, postId } = navItem
    this.name = name;
    this.slug = slug;
    this.isLink = isLink
    this.id = id;
    this.postId = postId;
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
  public postId: number;
  public subMenuItems: INavigationItem [];


  constructor(
    private readonly _navService: NavService,
    private readonly _postService: PostService,
    private readonly _cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {}

  public getSubNavList(): void {
    this._postService.getPostListByCategoryId(this.id).pipe(
      map((res:ICategoryPost[]) => {
        return res.map((item:ICategoryPost) => {
          return {
            slug: item['slug'],
            name: item['title']['rendered'],
            isLink: true,
            postId: item.id
          }
        })
      })
    ).subscribe((res: INavigationItem[]) => {
      this.subMenuItems = res;
    })
  }

  public toggle(): void {
    console.log('test')
    this.isOpen = !this.isOpen;
    this.onToggle.emit(this.isOpen)
  }

  public close(): void {
    this.isOpen = false;
    this.onToggle.emit(this.isOpen)
    this._cdr.detectChanges()
  }

}
