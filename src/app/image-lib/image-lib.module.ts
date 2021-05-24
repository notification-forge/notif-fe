import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLibPageComponent } from './image-lib-page/image-lib-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

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
    NzFormModule,
    NzMessageModule,
    NzUploadModule,
    NzDropDownModule,
    NzTableModule,
    NzToolTipModule,
    NzDrawerModule,
    MonacoEditorModule,
    NzAvatarModule,
    NzRadioModule,
    NzModalModule,
    NzSkeletonModule,
    ReactiveFormsModule,
  ],
})
export class ImageLibModule {}
