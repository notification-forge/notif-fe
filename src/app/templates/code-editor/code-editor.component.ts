import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  GetTemplateVersionDetailsGQL,
  TemplateStatus,
} from 'src/app/graphql/graphql';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CodeEditorComponent implements OnInit, OnChanges {
  @Input() codeEditorVisible: boolean;
  @Input() templateVersionId: number;
  @Output() closeCodeEditor: EventEmitter<null> = new EventEmitter();

  tabValue = TabValues.DESIGN;
  readonly TAB_VALUES = TabValues;
  settingsVisible: boolean = false;
  initialDesignCode: string | null;
  detailsLoading: boolean = false;

  isSaving: boolean = false;
  saveSuccess: boolean = true;

  private shouldStopSubscribing: Subject<null> = new Subject();

  constructor(
    private getTemplateVersionDetails: GetTemplateVersionDetailsGQL,
    private editorService: EditorService
  ) {}

  ngOnInit(): void {
    this.editorService.saveLoading$.subscribe((saveLoading) => {
      this.isSaving = saveLoading;
    });
    this.editorService.saveSuccess$.subscribe((saveSuccess) => {
      this.saveSuccess = saveSuccess;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.codeEditorVisible && changes.codeEditorVisible.currentValue) {
      this.getTemplateVersionDetailsById(
        changes.templateVersionId?.currentValue || -1
      );
    } else {
      this.shouldStopSubscribing.next();
    }
  }

  getTemplateVersionDetailsById(templateVersionId: number) {
    if (templateVersionId !== -1) {
      this.detailsLoading = true;
      this.getTemplateVersionDetails
        .fetch({
          templateVersionId: String(templateVersionId),
        })
        .pipe(takeUntil(this.shouldStopSubscribing))
        .subscribe({
          next: ({ data, loading }) => {
            this.initialDesignCode = data.templateVersion?.body || null;
            this.editorService.initializeEmail(
              templateVersionId,
              data.templateVersion?.body || null,
              data.templateVersion?.name || '',
              data.templateVersion?.status || TemplateStatus.Draft
            );
            this.detailsLoading = loading;
          },
        });
    }
  }

  onCloseCodeEditor() {
    this.closeCodeEditor.emit();
  }

  openSettings() {
    this.settingsVisible = true;
  }

  closeSettings() {
    this.settingsVisible = false;
  }
}

enum TabValues {
  DESIGN = 'DESIGN',
  TEST = 'TEST',
  SETTINGS = 'SETTINGS',
}
