import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTileComponent } from './navigation-tile/navigation-tile.component';



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationTileComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UiModule { }
