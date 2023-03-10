import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTileComponent } from './navigation-tile/navigation-tile.component';
import { LogoComponent } from './logo/logo.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { RouterModule } from '@angular/router';
import { MainMottoComponent } from './main-motto/main-motto.component';
import { LoaderComponent } from './loader/loader.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { FooterComponent } from './footer/footer.component';
import { PostBoxComponent } from './post-box/post-box.component';
import { BipComponent } from './bip/bip.component';
import { FullScreenGalleryComponent } from './full-screen-gallery/full-screen-gallery.component';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { TrapFocusDirective } from '../directives/trap-focus.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { AccessibilityBarComponent } from './accessibility-bar/accessibility-bar.component';



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationTileComponent,
    LogoComponent,
    NavButtonComponent,
    MainMottoComponent,
    LoaderComponent,
    SubMenuComponent,
    FooterComponent,
    PostBoxComponent,
    BipComponent,
    FullScreenGalleryComponent,
    BaseModalComponent,
    PaginationComponent,
    AccessibilityBarComponent

  ],
  exports: [
    NavigationComponent,
    LoaderComponent,
    SubMenuComponent,
    FooterComponent,
    PostBoxComponent,
    BaseModalComponent,
    FullScreenGalleryComponent,
    PaginationComponent,
    AccessibilityBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TrapFocusDirective
  ]
})
export class UiModule { }
