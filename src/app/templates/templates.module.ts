import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesPageComponent } from './templates-page/templates-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { TrustCssPipe } from './trust-css.pipe';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DesignEditorComponent } from './design-editor/design-editor.component';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SettingsEditorComponent } from './settings-editor/settings-editor.component';
import { EditorService } from './editor.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { HtmlPreviewComponent } from './html-preview/html-preview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TemplatesPageComponent,
      },
      {
        path: 'editor',
        component: CodeEditorComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    TemplatesPageComponent,
    TemplateDetailsComponent,
    CodeEditorComponent,
    TrustCssPipe,
    DesignEditorComponent,
    TestEditorComponent,
    SettingsEditorComponent,
    HtmlPreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzDropDownModule,
    NzToolTipModule,
    NzDrawerModule,
    NzAvatarModule,
    FormsModule,
    NzRadioModule,
    NzFormModule,
    NzModalModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzUploadModule,
    NzSkeletonModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [EditorService],
})
export class TemplatesModule {}
