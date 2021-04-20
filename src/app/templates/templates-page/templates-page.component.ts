import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  AlertType,
  GetAllTemplatesWithPagesGQL,
  Template,
} from 'src/app/graphql/graphql';
import { LayoutService } from 'src/app/shared/layout.service';

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
  listOfData: (Template | null)[] = [];
  expandSet = new Set<string>();
  codeEditorVisible = false;
  tableLoading = false;

  // Create Template Form
  showCreateTemplateForm = false;
  createTemplateForm = this.fb.group({
    templateName: ['', Validators.required],
    alertType: ['EMAIL' as AlertType, Validators.required],
  });

  constructor(
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private getAllTemplatesWithPages: GetAllTemplatesWithPagesGQL
  ) {}

  ngOnInit(): void {
    this.layoutService.setHeaderTitle('Templates');
    this.getAllTemplates();
  }

  getAllTemplates() {
    this.tableLoading = true;
    this.getAllTemplatesWithPages
      .watch({ name: '', appCodes: [], pageNumber: 0, rowPerPage: 10 })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          this.tableLoading = loading;
          this.listOfData = data.templatePages?.content || [];
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.tableLoading = false;
        }
      );
  }

  onExpandChange(id: string, checked: boolean): void {
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
