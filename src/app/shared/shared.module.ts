import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [SideNavComponent, HeaderComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    RouterModule,
    NzButtonModule,
  ],
  exports: [SideNavComponent, HeaderComponent],
})
export class SharedModule {}
