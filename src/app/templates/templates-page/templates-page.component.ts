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
import { NzTableQueryParams } from 'ng-zorro-antd/table';

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

  // Pagination
  pagination: Pagination = {
    pageSize: 10,
    pageIndex: 0,
    totalElements: 0,
  };

  constructor(
    private layoutService: LayoutService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private getAllTemplatesWithPagesQuery: GetAllTemplatesWithPagesGQL,
    private createTemplateQuery: CreateTemplateGQL
  ) {}

  ngOnInit(): void {
    const { pageSize, pageIndex } = this.pagination;
    this.layoutService.setHeaderTitle('Templates');
    this.getAllTemplates(pageSize, pageIndex);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  getAllTemplates(pageSize: number, pageIndex: number) {
    this.tableLoading = true;
    this.getAllTemplatesWithPagesQuery
      .fetch(
        {
          name: '',
          appCodes: ['BCAT'],
          pageNumber: pageIndex,
          rowPerPage: pageSize,
        },
        { fetchPolicy: 'network-only' }
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: ({ data, loading }) => {
          this.tableLoading = loading;
          this.listOfData = data.templatePages?.content || [];
          const pagination: Pagination = {
            totalElements: data.templatePages?.totalElements || 0,
            pageSize: data.templatePages?.size || 0,
            pageIndex: data.templatePages?.number || 0,
          };

          this.pagination = pagination;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.tableLoading = false;
        },
      });
  }

  onPageChange({ pageIndex, pageSize }: NzTableQueryParams): void {
    if (pageIndex - 1 !== this.pagination.pageIndex) {
      const paginationClone = {
        ...this.pagination,
        pageIndex: pageIndex - 1,
        pageSize,
      };
      this.pagination = paginationClone;

      this.getAllTemplates(pageSize, pageIndex - 1);
    }
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

interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalElements: number;
}
