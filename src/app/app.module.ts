import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UiModule } from './common/ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { LoadingInterceptor } from './common/interceptors/loading.interceptor';
import { CommonModule } from '@angular/common';
import { PostsModule } from './posts/posts.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiModule,
    PostsModule,
    AppRoutingModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
