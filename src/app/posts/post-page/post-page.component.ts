import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, HostListener,
  NgZone,
  OnInit, Renderer2, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../common/service/PostService';
import { IPost } from '../../common/interfaces/IPost';
import { map, Observable, switchMap, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit, AfterViewInit {

  @ViewChild('mainSection', { static: false }) set mainSection(mainSection: ElementRef<HTMLElement>) {
    if (mainSection) {
      this.mainSectionElRef = mainSection;
      this.setEventListener();
    }
  }

  public postDetails$: Observable<IPost>;
  public mainSectionElRef: ElementRef<HTMLElement>
  public urlImages: { src: string, altText: string }[] = [];
  public selectedIndex: number = -1;
  private _postId: number;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService,
    private readonly _renderer2: Renderer2,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _domSanitizer: DomSanitizer
  ) {
  }

  public ngOnInit(): void {
    this.postDetails$ = this._route.params.pipe(
      tap(({ id }) => this._postId = id),
      switchMap(({ id }) => this._postService.getPostDetails(id)),
      map((postDetails: IPost) => {
        return {
          name: postDetails.title.rendered,
          id: postDetails.id,
          slug: postDetails.slug,
          formattedContent: this._domSanitizer.bypassSecurityTrustHtml(postDetails.content.rendered),
          date: postDetails.date,
          author: postDetails._embedded.author[0].name,
          image: {
            title: postDetails._embedded['wp:featuredmedia']?.[0]?.title.rendered || '',
            alt_text: postDetails._embedded['wp:featuredmedia']?.[0]?.alt_text || '',
            url: postDetails._embedded['wp:featuredmedia']?.[0]?.source_url || ''
          }
        }
      }),
    );
  }

  public ngAfterViewInit(): void {

  }

  public setEventListener(): void {
    const { nativeElement } = this.mainSectionElRef;

    this._renderer2.listen(nativeElement, 'click', (event: MouseEvent) => {
      console.log(nativeElement)
      this.urlImages = [];

      nativeElement.querySelectorAll('figure img')
      .forEach((imageElement: HTMLImageElement) => {
        this.urlImages.push({
          src: imageElement.src,
          altText: imageElement.alt
        });
      });

      const target = event.target as HTMLImageElement;

      if (target.matches('figure img')) {
        event.preventDefault();
        this.selectedIndex = this.urlImages.findIndex((urlImage: { altText: string, src: string }) => urlImage.src === target.src);
        this._cdr.detectChanges();
      }
    });
  }
}
