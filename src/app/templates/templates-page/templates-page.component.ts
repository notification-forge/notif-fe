import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/layout.service';
import { TemplateItem } from '../templates.models';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss'],
})
export class TemplatesPageComponent implements OnInit {
  tagValue = [];
  listOfOption: DropdownOption[] = [
    {
      label: 'BCAT',
      value: 'bcat',
    },
    {
      label: 'SDWT',
      value: 'sdwt',
    },
  ];
  listOfData: TemplateItem[] = [
    {
      id: 1,
      template: 'BCAT Success Email',
      app: 'BCAT',
      deliveryChannel: 'Email',
      lastEdited: new Date(),
    },
    {
      id: 2,
      template: 'BCAT Failure Email',
      app: 'BCAT',
      deliveryChannel: 'Email',
      lastEdited: new Date(),
    },
    {
      id: 3,
      template: 'SDWT Success Email',
      app: 'BCAT',
      deliveryChannel: 'Email',
      lastEdited: new Date(),
    },
  ];
  expandSet = new Set<number>();
  codeEditorVisible = false;
  codeEditorHeight = window.innerHeight;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.setHeaderTitle('Templates');
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.clear();
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  openCodeEditor() {
    this.codeEditorVisible = true;
  }

  closeCodeEditor() {
    this.codeEditorVisible = false;
  }
}

interface DropdownOption {
  label: string;
  value: string;
}
