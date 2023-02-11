import { ComponentFactory, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _instance: [];
  constructor(
    private readonly _componentFactoryResolver: ComponentFactory<any>
  ) { }

  public openModal(component): void {
    
  }
}

