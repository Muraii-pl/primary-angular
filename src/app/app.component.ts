import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from './common/service/ApiService';
import { ModalService } from './common/service/ModalService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'primary-school-angular';

  constructor(
    private readonly _apiService: ApiService,
    private readonly modalService: ModalService,
    public viewRef: ViewContainerRef,
  ) {
    this.modalService.setContainerElementViewRef(this.viewRef)
  }

 public ngOnInit():void {
 }
}
