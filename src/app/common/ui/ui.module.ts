import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTileComponent } from './navigation-tile/navigation-tile.component';
import { LogoComponent } from './logo/logo.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { RouterModule } from '@angular/router';
import { MainMottoComponent } from './main-motto/main-motto.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationTileComponent,
    LogoComponent,
    NavButtonComponent,
    MainMottoComponent,
    LoaderComponent,

  ],
  exports: [
    NavigationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UiModule { }
