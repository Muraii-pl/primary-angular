import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TabIndexService } from '../../service/TabIndexService';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {

  @Input() isVisible: boolean;

  public readonly logoUrl = `${environment.imagesUrl}assets/images/logo.png`
  public readonly logoText = "Logo - Zespół Szkolno-Przedszkolny w Hażlachu"
  public readonly linkToHome = environment.homeUrl
  public tabIndex: number;

  constructor(
    private readonly _tabIndexService: TabIndexService,
    private readonly _cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('logo').subscribe((tabIndex) => {
      this.tabIndex = tabIndex;
      this._cdr.detectChanges();
    })
  }

}
