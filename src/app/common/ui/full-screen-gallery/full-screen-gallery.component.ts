import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MediaService } from '../../service/MediaService';

@Component({
  selector: 'app-full-screen-gallery',
  templateUrl: './full-screen-gallery.component.html',
  styleUrls: ['./full-screen-gallery.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullScreenGalleryComponent {

  @Input() set Data(data) {
    if (data) {
      this.imageList = data.urlImageList
      this.selectedImageIndex = data.clickedElementIdx
    }
  }
  public imageList: { src: string, altText: string}[];
  public selectedImageIndex: number = 0;

  constructor(
    private readonly _mediaService: MediaService,
  ) { }


  public nextImage(): void {
    this.selectedImageIndex = this.selectedImageIndex !== this.imageList.length - 1 ? this.selectedImageIndex + 1 : 0
  }

  public prevImage(): void {
    this.selectedImageIndex = this.selectedImageIndex !== 0 ? this.selectedImageIndex - 1 : this.imageList.length - 1
  }




}
