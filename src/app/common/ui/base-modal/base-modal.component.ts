import {
  Component,
  EventEmitter,
  Input,
  OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.less'],
})
export class BaseModalComponent implements OnInit {
 @Input() title: string;
 @Output() closeModal =new EventEmitter<void>();

  constructor(
  ) {}

  public ngOnInit(): void {
  }

}
