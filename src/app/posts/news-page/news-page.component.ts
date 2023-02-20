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
import { INewestPost } from '../../common/interfaces/INewestPost';
import { map } from 'rxjs';
import { IPost } from '../../common/interfaces/IPost';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent implements OnInit, OnDestroy {

  public newsPostList: IPost[] = []
  public currentPage = 10;
  private _pageIndex = 1;
  private _pageSize: number = 10;
  private totalPost: number;

  constructor(
    private readonly _postService: PostService,
    private readonly _renderer2: Renderer2,
    private readonly _zone: NgZone,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _appRef: ApplicationRef,
    private readonly _domSanitizer: DomSanitizer
  ) {
  }

  public ngOnInit(): void {
    this.getPosts();
    this._zone.runOutsideAngular(() => this.lazyLoading())
  }

  private getPosts(): void {
    this._postService.getAllPost(this._pageSize, this._pageIndex).pipe(map((res: INewestPost) => {
      return {
        Total: res.Total,
        TotalPages: res.TotalPages,
        Posts: res.Posts.map((post: IPost) => {
          return {
            image: {
              url: post.featured_image.source_url ? post.featured_image.source_url : '',
              title: post.featured_image.title ? post.featured_image.title : '',
              alt_text: post.featured_image.alt_text ? post.featured_image.alt_text : ''
            },
            name: this._domSanitizer.bypassSecurityTrustHtml(post.name as string) ,
            shortedContent: post.shortedContent,
            slug: post.slug
          }
        })
      }
    }))
    .subscribe((res:INewestPost) => {
      this.newsPostList = [...this.newsPostList, ...res.Posts];
      this.totalPost = res.Total;
      console.log(this.newsPostList)
      this._cdr.detectChanges();
      this._appRef.tick();
    })
  }

  private lazyLoading() {
    this._renderer2.listen('window', 'scroll', () => {
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
