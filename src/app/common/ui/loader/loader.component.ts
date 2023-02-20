import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { LoaderService } from '../../service/LoaderService';
import { Observable, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  public isLoading: boolean = false;

  constructor(
    private readonly _loaderService: LoaderService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _renderer2: Renderer2,
  ) {
    this._loaderService.getLoaderStatus().subscribe(res => {
      this.isLoading = res;
      res ? this._renderer2.addClass(document.body, 'no-scroll') :
        this._renderer2.removeClass(document.body, 'no-scroll');
      this._cdr.detectChanges();
    });
  }


}
