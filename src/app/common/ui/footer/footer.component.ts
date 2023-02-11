import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IPost } from '../../interfaces/IPost';
import { TabIndexService } from '../../service/TabIndexService';
import { Observable, pipe, tap } from 'rxjs';
import { PostService } from '../../service/PostService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  public tabIndex: number;
  public subMenuList$: Observable<IPost[]>
  public subPostList: IPost[]
  public readonly thisYear = new Date().getFullYear();

  public readonly footerPostList: IPost[] = [
    {
      name: 'Jadłospis',
      slug: 'jadlospis'
    },
    {
      name: 'Konsultacje',
      slug: 'konsultacje'
    },
    {
      name: 'Świetlica Szkolna',
      slug: 'swietlica-szkolna'
    },
    {
      name: 'Sekretariat',
      slug: 'sekretariat'
    },
    {
      name: 'Biblioteka',
      slug: 'biblioteka'
    },
    {
      name: 'Rada Rodziców',
      slug: 'rada-rodzicow'
    },
    {
      name: 'Polityka bezpieczeństwa',
      slug: 'polityka-bezpieczenstwa'
    },
    {
      name: 'RODO',
      slug: 'rodo'
    },
  ]

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _tabIndexService: TabIndexService,
    private readonly _postService: PostService,
  ) { }

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('footerItem').subscribe((tabIndex) => {
      this.tabIndex = tabIndex
      this._cdr.detectChanges();
    })
    this._postService.getSubMenuList().subscribe((res: IPost[]) => {
      this.subPostList = res;
      this._cdr.detectChanges();
    });

  }



}
