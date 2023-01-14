import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTileComponent } from './navigation-tile/navigation-tile.component';
import { LogoComponent } from './logo/logo.component';
import { NavButtonComponent } from './nav-button/nav-button.component';



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationTileComponent,
    LogoComponent,
    NavButtonComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UiModule { }
