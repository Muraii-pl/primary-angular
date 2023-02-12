import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { BaseModalComponent } from '../ui/base-modal/base-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _containerElementViewRef: ViewContainerRef;
  private _modalComponentRef: ComponentRef<BaseModalComponent>;
  private _instances = [];

  constructor() {
  }

  public openModal(component, params?): void {

    this._modalComponentRef = this._containerElementViewRef.createComponent(BaseModalComponent)
    const instance = this._modalComponentRef.instance
    instance.setChildComponent = component;
    if (params) {
      if (params.data) {
        instance.Data = params.data;
      }
      if (params.title) {
        instance.title = params.title
      }
    }
    instance.onClose$.subscribe(res => {
      this.close();
    })
    this._instances.push(instance)

  }

  public setContainerElementViewRef(containerViewRef: ViewContainerRef) {
    this._containerElementViewRef = containerViewRef
  }

  public close(): void {
    if (this._instances.length) {
      this._containerElementViewRef.remove(this._instances.length - 1)
      this._instances.splice(this._instances.length - 1, 1)
    }
  }
}

