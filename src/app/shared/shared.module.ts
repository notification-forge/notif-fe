import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, NzMenuModule],
  exports: [SideNavComponent],
})
export class SharedModule {}
