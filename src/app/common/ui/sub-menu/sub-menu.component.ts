import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
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
  private _orginalSubMenuPostList: IPost[]
  private readonly _categorySlug = 'sub-menu'

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _postService: PostService,
    private readonly _navService: NavService,
    private readonly _tabIndexService: TabIndexService
  ) { }

  //   480px - 3 elem
  //   640px - 4 elem
  //   720px - cała lista

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('subMenuItem').subscribe((tabIndex) => {
      this.tabIndex = tabIndex;
      this._cdr.detectChanges();
    })
    this._navService.getNavList().subscribe((res: INavigationList[]) => {
      this._subMenuId = res.find((item: INavigationList) => item.slug === this._categorySlug).id;
      this._postService.getPostListByCategoryId(this._subMenuId).subscribe((res:ICategoryPost[]) => {
        this._orginalSubMenuPostList = res.map((post: ICategoryPost) => {
          return {
            name: post.title.rendered,
            slug: post.slug,
            id: post.id,
            categories: post.categories
          }
        })
        this._orginalSubMenuPostList.unshift({
          name: 'Aktualności',
          slug: '',
          id: -1,
          categories: [-1]
        })
        this.setOtherItemInMenu();
        this._cdr.detectChanges();
      })
    })
  }
  @HostListener('window:resize')
  private setOtherItemInMenu(): void {
    if(innerWidth < 480) {
      this._postService.setSubMenuList(this._orginalSubMenuPostList.slice(2))
      this.subMenuPostList = this._orginalSubMenuPostList.slice(0,2)
    } else if (innerWidth >= 480 && innerWidth < 640) {
      this._postService.setSubMenuList(this._orginalSubMenuPostList.slice(3))
      this.subMenuPostList = this._orginalSubMenuPostList.slice(0,3)
    } else if (innerWidth >= 640 && innerWidth < 720) {
      this._postService.setSubMenuList(this._orginalSubMenuPostList.slice(4))
      this.subMenuPostList = this._orginalSubMenuPostList.slice(0,4)
    } else {
      this._postService.setSubMenuList([])
      this.subMenuPostList = this._orginalSubMenuPostList;
    }
    this._cdr.detectChanges()
  }

}
