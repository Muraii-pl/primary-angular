import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { PostService } from '../../common/service/PostService';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent implements OnInit, OnDestroy {

  public post: any[] = []
  private _pageIndex = 1;
  private _pageSize: number = 10;
  private totalPost: number;
  constructor(
    private readonly _postService: PostService,
    private readonly _renderer2: Renderer2,
    private readonly _zone: NgZone,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _appRef: ApplicationRef
  ) { }

  public ngOnInit(): void {
    this.getPosts();
    this._zone.runOutsideAngular(() => this.lazyLoading())
  }

  private getPosts(): void {
    this._postService.getAllPost(this._pageSize, this._pageIndex).subscribe(res => {
      this.totalPost = res.Total;
      this.post = [...this.post, ...res.Posts];
      this._cdr.detectChanges();
      this._appRef.tick();

    })
  }
  private lazyLoading() {
    this._renderer2.listen('window', 'scroll', ()=> {
      if (innerHeight + pageYOffset >= document.body.offsetHeight) {
        if (this.totalPost > this._pageIndex * this._pageSize) {
          this._pageIndex += 1;
          this.getPosts();

        }
      }
    })
  }

  public ngOnDestroy(): void {
    this._cdr.detectChanges();
  }
}
