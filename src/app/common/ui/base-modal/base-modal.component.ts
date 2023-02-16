import {
  Component,
  EventEmitter,
  Input,
  OnInit, Output,
} from '@angular/core';
import { TabIndexService } from '../../service/TabIndexService';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.less'],
})
export class BaseModalComponent implements OnInit {
 @Input() title: string;
 @Output() closeModal =new EventEmitter<void>();

  constructor(
    private readonly _tabIndexService: TabIndexService
  ) {}

  public ngOnInit(): void {
  }

}
