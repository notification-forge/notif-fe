import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  AlertType,
  CreateTemplateGQL,
  GetAllTemplatesWithPagesGQL,
  Template,
} from 'src/app/graphql/graphql';
import { LayoutService } from 'src/app/shared/layout.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AuthService } from 'src/app/shared/auth.service';
import { App } from 'src/app/shared/models/api.models';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.scss'],
})
export class TemplatesPageComponent implements OnInit, OnDestroy {
  // Search Header
  selectedAppCodes: string[] = [];
  appList: App[] = [];
  allAppCodes: string[] = [];
  appMap: AppMap;

  // Templates Details
  templateList: (Template | null | undefined)[] = [];
  expandSet = new Set<string>();
  codeEditorVisible = false;

  // Create Template Form
  showCreateTemplateForm = false;
  createTemplateForm = this.fb.group({
    templateName: ['', Validators.required],
    alertType: ['EMAIL' as AlertType, Validators.required],
    appCode: ['', Validators.required],
  });

  // Loaders
  tableLoading = false;
  formLoading = false;

  // Observable
  onDestroy$: Subject<null> = new Subject<null>();

  // Search
  query: string;
  queryChanged: Subject<string> = new Subject<string>();

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
    private auth: AuthService,

    // Queries
    private getAllTemplatesWithPagesQuery: GetAllTemplatesWithPagesGQL,
    private createTemplateQuery: CreateTemplateGQL
  ) {}

  ngOnInit(): void {
    this.layoutService.setHeaderTitle('Templates');

    this.auth.user$.subscribe((user) => {
      this.appList = user?.apps || [];
      this.allAppCodes = user?.apps.map((app) => app.appCode) || [];
      this.appMap =
        user?.apps.reduce((reducer, app) => {
          reducer[app.appCode] = app;
          return reducer;
        }, {} as AppMap) || {};
    });

    this.queryChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe((query: string) => {
        this.query = query;
        let queryAppCodes = this.selectedAppCodes;
        if (this.selectedAppCodes.length === 0)
          queryAppCodes = this.allAppCodes;

        this.getAllTemplates(
          this.pagination.pageSize,
          0,
          false,
          query,
          queryAppCodes
        );
      });

    const { pageSize, pageIndex } = this.pagination;
    this.getAllTemplates(pageSize, pageIndex);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  getAllTemplates(
    pageSize: number,
    pageIndex: number,
    shouldUseNetwork: boolean = false,
    query: string = '',
    appCodes: string[] = this.allAppCodes
  ) {
    this.tableLoading = true;
    this.getAllTemplatesWithPagesQuery
      .fetch(
        {
          name: query,
          appCodes: appCodes,
          pageNumber: pageIndex,
          rowPerPage: pageSize,
        },
        { fetchPolicy: shouldUseNetwork ? 'network-only' : 'cache-first' }
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: ({ data, loading }) => {
          const templateList =
            data.templates?.edges?.map((edge) => edge?.node) || [];

          this.tableLoading = loading;
          this.templateList = templateList;
          const pagination: Pagination = {
            totalElements: data.templates?.totalCount || 0,
            pageSize,
            pageIndex,
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

  openForm() {
    this.showCreateTemplateForm = true;
  }

  closeForm() {
    this.showCreateTemplateForm = false;
  }

  onSearch(query: string) {
    this.queryChanged.next(query);
  }

  onAppFilterSelect(appCodes: string[]) {
    this.selectedAppCodes = appCodes;
    let queryAppCodes = appCodes;
    if (appCodes.length === 0) queryAppCodes = this.allAppCodes;

    this.getAllTemplates(
      this.pagination.pageSize,
      0,
      false,
      this.query,
      queryAppCodes
    );
  }

  onFormSubmit() {
    const { templateName, alertType, appCode } = this.createTemplateForm.value;
    this.formLoading = true;
    this.createTemplateQuery
      .mutate({ name: templateName, alertType, appCode })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (_) => {
          this.message.success(
            `Template with name: "${this.createTemplateForm.value.templateName}" created`
          );

          this.getAllTemplates(this.pagination.pageSize, 0, true);
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

interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalElements: number;
}

interface AppMap {
  [key: string]: App;
}
