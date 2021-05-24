import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  AlertType,
  GetAllImagesGQL,
  UploadImageGQL,
  Image,
  UploadImageDocument,
} from 'src/app/graphql/graphql';

import * as Apollo from 'apollo-angular';
import { LayoutService } from 'src/app/shared/layout.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AuthService } from 'src/app/shared/auth.service';
import { App } from 'src/app/shared/models/api.models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-image-lib-page',
  templateUrl: './image-lib-page.component.html',
  styleUrls: ['./image-lib-page.component.scss'],
})
export class ImageLibPageComponent implements OnInit, OnDestroy {
  tagValue = [];
  listOfOption: DropdownOption[] = [];
  images: ImageItem[] = [];

  // Search Header
  selectedAppCodes: string[] = [];
  appList: App[] = [];
  allAppCodes: string[] = [];
  appMap: AppMap;

  imageList: (Image | null | undefined)[] = [];

  // Upload Image Form

  showUploadImageForm = false;
  uploadImageForm = this.fb.group({
    file: [null, Validators.required],
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
  file: any;

  constructor(
    private layoutService: LayoutService,
    private message: NzMessageService,
    private auth: AuthService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private Apollo: Apollo.Apollo,
    // Queries
    private getAllImagesQuery: GetAllImagesGQL,
    private uploadImageQuery: UploadImageGQL
  ) {}

  ngOnInit(): void {
    this.layoutService.setHeaderTitle('Image Library');
    this.auth.user$.subscribe((user) => {
      this.appList = user?.apps || [];
      this.allAppCodes = user?.apps.map((app) => app.appCode) || [];
      for (let appcodeItem of this.allAppCodes) {
        const modal: DropdownOption = {
          label: appcodeItem,
          value: appcodeItem,
        };
        this.listOfOption.push(modal);
      }
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
        this.getAllImages(
          this.pagination.pageSize,
          0,
          false,
          query,
          queryAppCodes
        );
      });

    const { pageSize, pageIndex } = this.pagination;
    this.getAllImages(pageSize, pageIndex);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  getAllImages(
    pageSize: number,
    pageIndex: number,
    shouldUseNetwork: boolean = false,
    query: string = '',
    appCodes: string[] = this.allAppCodes
  ) {
    this.tableLoading = true;
    this.getAllImagesQuery
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
          this.images.length = 0;
          const imageList = data.images?.edges?.map((edge) => edge?.node) || [];

          this.tableLoading = loading;
          this.imageList = imageList;

          for (var imageItem of imageList) {
            const modal: ImageItem = {
              app: imageItem?.appCode!,
              url: this.sanitizer.bypassSecurityTrustResourceUrl(
                'data:image/jpg;base64,' + imageItem?.imageData!
              ),
              fileName: imageItem?.fileName!,
            };
            this.images.push(modal);
          }

          const pagination: Pagination = {
            totalElements: data.images?.totalCount || 0,
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

  onSearch(query: string) {
    this.queryChanged.next(query);
  }

  openForm() {
    this.showUploadImageForm = true;
  }

  closeForm() {
    this.showUploadImageForm = false;
  }

  onAppFilterSelect(appCodes: string[]) {
    this.selectedAppCodes = appCodes;
    let queryAppCodes = appCodes;
    if (appCodes.length === 0) queryAppCodes = this.allAppCodes;

    this.getAllImages(
      this.pagination.pageSize,
      0,
      false,
      this.query,
      queryAppCodes
    );
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }
  onFormSubmit() {
    const { file, appCode } = this.uploadImageForm.value;
    this.formLoading = true;
    this.Apollo.mutate({
      mutation: UploadImageDocument,

      variables: {
        file: this.file.name,
        appCode: appCode,
      },

      // context: {
      //   useMultipart: true
      // }
    }).subscribe({
      next: (_) => {
        this.message.success(`Uploaded image successfully`);

        this.getAllImages(this.pagination.pageSize, 0, true);
        this.formLoading = false;
        this.closeForm();
        this.uploadImageForm.reset();
      },
      error: (error) => {
        this.message.error(String(error));

        this.formLoading = false;
        this.closeForm();
        this.uploadImageForm.reset();
      },
    });
  }
}

interface DropdownOption {
  label: string;
  value: string;
}

interface ImageItem {
  url: SafeHtml;
  fileName: string;
  app: string;
}
interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalElements: number;
}
interface AppMap {
  [key: string]: App;
}
