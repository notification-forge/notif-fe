import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/layout.service';
import { TemplateItem } from '../templates.models';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss'],
})
export class TemplatesPageComponent implements OnInit {
  tagValue = ['a10', 'c12', 'tag'];
  listOfOption: { label: string; value: string }[] = [];
  listOfData: TemplateItem[] = [
    {
      id: 1,
      template: 'BCAT Success Email',
      app: 'BCAT',
      deliveryChannel: 'Email',
      lastEdited: new Date(),
    },
  ];
  expandSet = new Set<number>();

  constructor(private layoutService: LayoutService) {}

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnInit(): void {
    this.layoutService.setHeaderTitle('Templates');
    const children: { label: string; value: string }[] = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
