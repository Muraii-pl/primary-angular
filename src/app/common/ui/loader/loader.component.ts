import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../../service/LoaderService';
import { Observable, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public isLoading: boolean = false;

  constructor(
    private readonly _loaderService: LoaderService,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this._loaderService.getLoaderStatus().pipe(tap(res => {
      this.isLoading = res;
      this._cdr.detectChanges();
    }));
  }

  public ngOnInit(): void {

  }

}
