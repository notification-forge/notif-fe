import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SideNavComponent, HeaderComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    RouterModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [SideNavComponent, HeaderComponent],
})
export class SharedModule {}
