import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  GetTemplateVersionDetailsGQL,
  MessageType,
  TemplateStatus,
} from 'src/app/graphql/graphql';
import { LayoutService } from 'src/app/shared/layout.service';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CodeEditorComponent implements OnInit, OnDestroy {
  templateVersionId: number;
  tabValue = TabValues.DESIGN;
  readonly TAB_VALUES = TabValues;
  settingsVisible: boolean = false;
  detailsLoading: boolean = false;

  isSaving: boolean = false;
  saveSuccess: boolean = true;

  private shouldStopSubscribing: Subject<null> = new Subject();

  constructor(
    private getTemplateVersionDetails: GetTemplateVersionDetailsGQL,
    private editorService: EditorService,
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.layoutService.shouldShowHeaderAndSideNav$.next(false);
    this.route.paramMap.subscribe((params) => {
      let id = params.get('templateVersionId') || -1;
      if (id !== -1) {
        id = +id;
        this.getTemplateVersionDetailsById(id);
      }
      this.templateVersionId = id;
    });
    this.editorService.saveLoading$.subscribe((saveLoading) => {
      this.isSaving = saveLoading;
    });
    this.editorService.saveSuccess$.subscribe((saveSuccess) => {
      this.saveSuccess = saveSuccess;
    });
  }

  ngOnDestroy(): void {
    this.layoutService.shouldShowHeaderAndSideNav$.next(true);
  }

  getTemplateVersionDetailsById(templateVersionId: number) {
    if (templateVersionId !== -1) {
      this.detailsLoading = true;
      this.getTemplateVersionDetails
        .fetch(
          {
            templateVersionId: String(templateVersionId),
          },
          { fetchPolicy: 'network-only' }
        )
        .pipe(takeUntil(this.shouldStopSubscribing))
        .subscribe({
          next: ({ data, loading }) => {
            console.log(data);
            this.editorService.initializeEmail(
              templateVersionId,
              data.templateVersion?.body || null,
              data.templateVersion?.name || '',
              data.templateVersion?.settings || '{}',
              data.templateVersion?.status || TemplateStatus.Draft,
              data.templateVersion?.template?.type || MessageType.Email
            );
            this.detailsLoading = loading;
          },
        });
    }
  }

  openSettings() {
    this.settingsVisible = true;
  }

  closeSettings() {
    this.settingsVisible = false;
  }

  manualRetrySave() {
    this.editorService.saveTemplate();
  }

  publishTemplate() {
    console.log('attempt to publish...');
    this.editorService.publishTemplate().subscribe((res) => {
      console.log('published', res);
      this.goBack();
    });
  }

  goBack() {
    this.location.back();
  }
}

enum TabValues {
  DESIGN = 'DESIGN',
  TEST = 'TEST',
  SETTINGS = 'SETTINGS',
}
