import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './posts/post-page/post-page.component';
import { MainPageComponent } from './posts/main-page/main-page.component';
import { NewsPageComponent } from './posts/news-page/news-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'aktualnosci',
    component: NewsPageComponent
  },
  {
    path: 'post/:id',
    component: PostPageComponent
  },
  {
    path: ':id',
    component: PostPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
