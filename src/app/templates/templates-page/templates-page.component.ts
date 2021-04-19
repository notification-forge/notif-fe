import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LayoutService } from 'src/app/shared/layout.service';
import { DeliveryChannel, TemplateItem } from '../templates.models';

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

  // Create Template Form
  showCreateTemplateForm = false;
  createTemplateForm = this.fb.group({
    templateName: ['', Validators.required],
    deliveryChannel: ['EMAIL' as DeliveryChannel, Validators.required],
  });

  constructor(
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

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

  openForm() {
    this.showCreateTemplateForm = true;
  }

  closeForm() {
    this.showCreateTemplateForm = false;
  }

  onFormSubmit() {
    this.closeForm();
    this.message.success(
      `Template with name: "${this.createTemplateForm.value.templateName}" created`
    );
    console.log(this.createTemplateForm.value);
  }
}

interface DropdownOption {
  label: string;
  value: string;
}
