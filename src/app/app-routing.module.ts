import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'templates',
    loadChildren: () =>
      import('./templates/templates.module').then(
        (module) => module.TemplatesModule
      ),
  },
  {
    path: 'image-lib',
    loadChildren: () =>
      import('./image-lib/image-lib.module').then(
        (module) => module.ImageLibModule
      ),
  },
  {
    path: '**',
    redirectTo: 'templates',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}