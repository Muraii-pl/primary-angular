import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ChangeDetectorRef, Input
} from '@angular/core';
import { TabIndexService } from '../../service/TabIndexService';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavButtonComponent implements OnInit {

  @Input() menuIsOpen = false;
  @Output() isOpen: EventEmitter<boolean> = new EventEmitter<boolean>(true)
  public tabIndex: number;
  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _tabIndexService: TabIndexService,
  ) { }

  public ngOnInit(): void {
    this._tabIndexService.getTabIndex('navButton').subscribe((tabIndex) => {
      this.tabIndex = tabIndex;
      this._cdr.detectChanges();
    })
  }

  public toggleNavigation(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.isOpen.emit(this.menuIsOpen);
    this._cdr.detectChanges();
  }


}
