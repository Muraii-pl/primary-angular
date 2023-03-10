import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-pagination[totalPages]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number = 1;
  @Input() totalPages: number;
  @Input() different: number = 3;

  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  public displayedListOfPage: string[];

  private _listOfPage: string[];

  constructor(
    private readonly _cdr: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.generateListOfPage();
  }

  public prevPage(): void {
    this.currentPage -= 1;
    this.getDisplayedListOfPage();
    this.currentPageChange.emit(this.currentPage)
    this._cdr.detectChanges();
  }

  public nextPage(): void {
    this.currentPage += 1;
    this.getDisplayedListOfPage();
    this.currentPageChange.emit(this.currentPage)
    this._cdr.detectChanges();
  }

  public changePage(index: number, page: string): void {

    if (page !== '...') {
      this.currentPage = +page;
      this.getDisplayedListOfPage();
      this.currentPageChange.emit(this.currentPage)
      this._cdr.detectChanges();
    }
  }

  private generateListOfPage(): void {
    this._listOfPage = Array.from({ length: this.totalPages }, (_, index) => `${ index + 1 }`)
    this.getDisplayedListOfPage();
  }

  private getDisplayedListOfPage(): void {
    this.displayedListOfPage = this._listOfPage.reduce((previousValue: string[], currentValue: string) => {
      if (previousValue.length === 0) {
        return ['1']
      }
      if (this.currentPage + this.different > +currentValue && this.currentPage - this.different < +currentValue) {
        return [...previousValue, currentValue]
      } else if (this.totalPages === +currentValue) {
        return [...previousValue, currentValue]
      } else {
        return [...previousValue, '...']
      }
    }, []).reduce((previousValue: string[], currentValue: string) => {
      if (currentValue === '1') {
        return ['1']
      } else if (previousValue[previousValue.length - 1] !== currentValue) {
        return [...previousValue, currentValue]
      } else {
        return [...previousValue]
      }
    }, []);

  }


}
