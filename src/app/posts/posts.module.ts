import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPageComponent } from './post-page/post-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UiModule } from '../common/ui/ui.module';
import { NewsPageComponent } from './news-page/news-page.component';



@NgModule({
  declarations: [
    PostPageComponent,
    MainPageComponent,
    NewsPageComponent
  ],
  imports: [
    CommonModule,
    UiModule
  ]
})
export class PostsModule { }
