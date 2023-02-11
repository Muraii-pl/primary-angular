import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { IPost } from '../../interfaces/IPost';
import { TabIndexService } from '../../service/TabIndexService';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostBoxComponent implements OnInit {

  @Input() postProperty: IPost

  public tabIndex: number
  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _tabIndexService: TabIndexService
  ) { }

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('subMenuItem').subscribe((tabIndex) => {
      this.tabIndex = tabIndex;
      this._cdr.detectChanges();
    })
  }

}
