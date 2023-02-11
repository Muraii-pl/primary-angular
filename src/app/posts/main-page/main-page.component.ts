import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../common/service/PostService';
import { NavService } from '../../common/service/NavService';
import { IPost } from '../../common/interfaces/IPost';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  public pinnedPostList$: Observable<IPost[]>

  constructor(
    private readonly _postService: PostService,
    private readonly _navService: NavService,
    private readonly _cdr: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.pinnedPostList$ = this._postService.getPinnedPost().pipe(
      map((res: IPost[]) => {
        return res.map((post: IPost) => {
          return {
            name: post.title.rendered,
            id: post.id,
            slug: post.slug,
            shortedContent: post.excerpt.rendered,
            date: post.date,
            author: post._embedded.author[0].name,
            image: {
              title: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].title.rendered : '',
              alt_text: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].alt_text : '',
              url: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : ''
            }
          }
        })
      })
    )
  }

}
