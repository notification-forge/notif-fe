import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLibPageComponent } from './image-lib-page/image-lib-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ImageLibPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ImageLibPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ImageLibModule {}
