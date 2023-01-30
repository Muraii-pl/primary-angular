import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../service/PostService';
import { IPost } from '../../interfaces/IPost';
import { NavService } from '../../service/NavService';
import { INavigationList } from '../../interfaces/INavigationList';
import { ICategoryPost } from '../../interfaces/ICategoryPost';
import { TabIndexService } from '../../service/TabIndexService';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubMenuComponent implements OnInit {

  public subMenuPostList: IPost[];
  public tabIndex: number;

  private _subMenuId: number;
  private readonly _categorySlug = 'sub-menu'

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _postService: PostService,
    private readonly _navService: NavService,
    private readonly _tabIndexService: TabIndexService
  ) { }

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('subMenuItem').subscribe((tabIndex) => {
      this.tabIndex = tabIndex;
      this._cdr.detectChanges();
    })
    this._navService.getNavList().subscribe((res: INavigationList[]) => {
      this._subMenuId = res.find((item: INavigationList) => item.slug === this._categorySlug).id;
      this._postService.getPostListByCategoryId(this._subMenuId).subscribe((res:ICategoryPost[]) => {
        this.subMenuPostList = res.map((post: ICategoryPost) => {
          return {
            name: post.title.rendered,
            slug: post.slug,
            id: post.id,
            categories: post.categories
          }
        })
        this.subMenuPostList.unshift({
          name: 'Aktualności',
          slug: '',
          id: -1,
          categories: [-1]
        })
        this._cdr.detectChanges();
      })
    })
  }

}
