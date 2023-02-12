import {
  AfterContentChecked, AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit, Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../common/service/PostService';
import { IPost } from '../../common/interfaces/IPost';
import { map, Observable } from 'rxjs';
import { ModalService } from '../../common/service/ModalService';
import { FullScreenGalleryComponent } from '../../common/ui/full-screen-gallery/full-screen-gallery.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PostPageComponent implements OnInit, AfterViewChecked {

  public postDetails$: Observable<IPost>;

  private _postId: number;
  private firstRender = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService,
    private readonly _zone: NgZone,
    private readonly _modalService: ModalService,
    private readonly _renderer2: Renderer2
  ) {
  }

  public ngOnInit(): void {
    this._route.params.subscribe(({id}) => {
      this._postId = id;
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

  public ngAfterViewChecked(): void {

    const imageNodeList = document.querySelectorAll<HTMLImageElement>('.wp-block-image img')
    const urlImage: { src: string, altText: string}[] = []

    if (!this.firstRender && imageNodeList.length) {

      imageNodeList.forEach((imageElement: HTMLImageElement, index: number) => {
        urlImage.push({
          src: imageElement.src,
          altText: imageElement.alt
        })
        this._renderer2.listen(imageElement, 'click', this.openModalGallery.bind(this,
          urlImage, index))
      })

      this.firstRender = true;
    }

  }

  public openModalGallery(urlImageList: { src: string, altText: string}[], clickedElementIdx: number): void {
    this._modalService.openModal(FullScreenGalleryComponent, {
      data: {
        urlImageList,
        clickedElementIdx
      },
      title: 'Podgląd zdjęć'
    })
  }
}
