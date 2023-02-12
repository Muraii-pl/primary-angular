import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef, Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseModalComponent<T = any> implements OnInit {

  @ViewChild('modalTemplate', { read: ViewContainerRef, static: true }) public modalTemplateRef: ViewContainerRef;

  @Input() set Data(data) {
    if (data) {
      this.contentModalInstance.instance.Data = data
    }
  };
 public title: string;
 public contentModalInstance: ComponentRef<any>;

  public onClose$: Subject<boolean> = new Subject<boolean>()
  constructor() {}

  public ngOnInit(): void {}

  public set setChildComponent(component) {
    this.contentModalInstance = this.modalTemplateRef.createComponent(component)

  }

  public onClose(): void {
    this.onClose$.next(true)
  }



}
