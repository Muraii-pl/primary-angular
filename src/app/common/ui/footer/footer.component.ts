import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IPost } from '../../interfaces/IPost';
import { TabIndexService } from '../../service/TabIndexService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  public tabIndex: number;
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
    private readonly _tabIndexService: TabIndexService
  ) { }

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('footerItem').subscribe((tabIndex) => {
      this.tabIndex = tabIndex
      this._cdr.detectChanges();
    })
  }



}
