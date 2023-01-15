import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavButtonComponent implements OnInit {

  @Output() isOpen: EventEmitter<boolean> = new EventEmitter<boolean>(true)

  public menuIsOpen = false;
  public readonly tabIndex = 1;
  constructor(
    private readonly _cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
  }

  public toggleNavigation(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.isOpen.emit(this.menuIsOpen);
    this._cdr.detectChanges();
  }


}
