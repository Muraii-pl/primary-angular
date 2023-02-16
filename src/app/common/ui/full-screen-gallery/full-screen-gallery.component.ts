import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, NgZone,
  OnInit,
  Output
} from '@angular/core';
import { MediaService } from '../../service/MediaService';

@Component({
  selector: 'app-full-screen-gallery',
  templateUrl: './full-screen-gallery.component.html',
  styleUrls: ['./full-screen-gallery.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullScreenGalleryComponent implements OnInit {

  @Input() set selectedImage(index: number) {

    this.selectedImageIndex = index;
  }
  @Input() set setImageList(imageList) {
    this.imageList = imageList;
  }

  @Output() selectedImageChange = new EventEmitter<number>();
  public title = "Galeria zdjęć";
  public selectedImageIndex: number;
  public imageList: { src: string, altText: string }[];

  constructor(
    private readonly _mediaService: MediaService,
    private readonly _cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
  }

  public nextImage(): void {
    this.selectedImageIndex = this.selectedImageIndex !== this.imageList.length - 1 ? this.selectedImageIndex + 1 : 0;
    this.selectedImageChange.emit(this.selectedImageIndex);
    this._cdr.detectChanges();
  }

  public prevImage(): void {
    this.selectedImageIndex = this.selectedImageIndex !== 0 ? this.selectedImageIndex - 1 : this.imageList.length - 1;
    this.selectedImageChange.emit(this.selectedImageIndex);
    this._cdr.detectChanges();
  }

  public closeModal(): void {
    this.selectedImageIndex = -1;
    this.selectedImageChange.emit(this.selectedImageIndex);
  }


}
