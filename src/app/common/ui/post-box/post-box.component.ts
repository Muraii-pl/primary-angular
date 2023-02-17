import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { IPost } from '../../interfaces/IPost';


@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostBoxComponent implements OnInit {

  @Input() postProperty: IPost


  constructor(
    private readonly _cdr: ChangeDetectorRef,

  ) { }

  public ngOnInit(): void {  }

}
