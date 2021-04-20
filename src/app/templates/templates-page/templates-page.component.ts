import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  AlertType,
  CreateTemplateGQL,
  GetAllTemplatesWithPagesGQL,
  Template,
} from 'src/app/graphql/graphql';
import { LayoutService } from 'src/app/shared/layout.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss'],
})
export class TemplatesPageComponent implements OnInit, OnDestroy {
  // UI related
  tagValue = [];
  listOfOption: DropdownOption[] = [
    {
      label: 'BCAT',
      value: 'BCAT',
    },
  ];
  listOfData: (Template | null)[] = [];
  expandSet = new Set<string>();
  codeEditorVisible = false;

  // Create Template Form
  showCreateTemplateForm = false;
  createTemplateForm = this.fb.group({
    templateName: ['', Validators.required],
    alertType: ['EMAIL' as AlertType, Validators.required],
    appCode: ['BCAT', Validators.required],
  });

  // Loaders
  tableLoading = false;
  formLoading = false;

  // Observable
  onDestroy$: Subject<null> = new Subject<null>();

  constructor(
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private getAllTemplatesWithPagesQuery: GetAllTemplatesWithPagesGQL,
    private createTemplateQuery: CreateTemplateGQL
  ) {}

  ngOnInit(): void {
    this.layoutService.setHeaderTitle('Templates');
    this.getAllTemplates();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  getAllTemplates() {
    this.tableLoading = true;
    this.getAllTemplatesWithPagesQuery
      .fetch(
        { name: '', appCodes: ['BCAT'], pageNumber: 0, rowPerPage: 10 },
        { fetchPolicy: 'network-only' }
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: ({ data, loading }) => {
          this.tableLoading = loading;
          this.listOfData = data.templatePages?.content || [];
          console.log(data.templatePages?.content);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.tableLoading = false;
        },
      });
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
    const { templateName, alertType, appCode } = this.createTemplateForm.value;
    this.formLoading = true;
    this.createTemplateQuery
      .mutate({ name: templateName, alertType, appCode })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: ({ data }) => {
          this.message.success(
            `Template with name: "${this.createTemplateForm.value.templateName}" created`
          );
          const newTemplate = data?.createTemplate;
          if (!!newTemplate) {
            const dataClone = cloneDeep(this.listOfData);
            dataClone.push(newTemplate);
            console.log('hmm', newTemplate);
            console.log('hmm', dataClone);
            this.listOfData = dataClone;
          }

          this.formLoading = false;
          this.closeForm();
          this.createTemplateForm.reset();
        },
        error: (error) => {
          this.message.error(String(error));

          this.formLoading = false;
          this.closeForm();
          this.createTemplateForm.reset();
        },
      });
  }
}

interface DropdownOption {
  label: string;
  value: string;
}
