import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesPageComponent } from './templates-page/templates-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TemplatesPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [TemplatesPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TemplatesModule {}
