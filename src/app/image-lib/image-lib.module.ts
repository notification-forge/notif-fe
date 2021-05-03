import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLibPageComponent } from './image-lib-page/image-lib-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ImageLibPageComponent,
        data: { animations: 'image-lib' },
      },
    ],
  },
];

@NgModule({
  declarations: [ImageLibPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    FormsModule,
  ],
})
export class ImageLibModule {}
