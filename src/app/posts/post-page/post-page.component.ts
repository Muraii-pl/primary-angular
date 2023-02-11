import { ChangeDetectionStrategy, Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../common/service/PostService';
import { IPost } from '../../common/interfaces/IPost';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit {

  public postDetails$: Observable<IPost>;
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService,
    private readonly _zone: NgZone,
  ) { }

  public ngOnInit(): void {
    console.log(this._zone)
    this._route.params.subscribe(({ id }) => {
      this.postDetails$ = this._postService.getPostDetails(id).pipe(
        map((postDetails: IPost) => {
          return {
            name: postDetails.title.rendered,
            id: postDetails.id,
            slug: postDetails.slug,
            formattedContent: postDetails.content.rendered,
            date: postDetails.date,
            author: postDetails._embedded.author[0].name,
            image: {
              title: postDetails._embedded['wp:featuredmedia'] ? postDetails._embedded['wp:featuredmedia'][0].title.rendered : '',
              alt_text: postDetails._embedded['wp:featuredmedia'] ? postDetails._embedded['wp:featuredmedia'][0].alt_text : '',
              url: postDetails._embedded['wp:featuredmedia'] ? postDetails._embedded['wp:featuredmedia'][0].source_url : ''
            }
          }
        })
      )
    })
  }

}
