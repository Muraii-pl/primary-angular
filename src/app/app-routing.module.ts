import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './posts/post-page/post-page.component';

const routes: Routes = [
  {
    path: 'post/:slug',
    component: PostPageComponent
  },
  {
    path: ':slug',
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
