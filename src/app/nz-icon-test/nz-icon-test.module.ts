import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => {
  const i = antDesignIcons[key];
  return i;
});

@NgModule({
  exports: [NzIconModule],
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: icons,
    },
  ],
})
export class NzIconTestModule {}
