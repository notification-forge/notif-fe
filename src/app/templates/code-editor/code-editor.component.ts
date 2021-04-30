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
import { ActivatedRoute } from '@angular/router';
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
export class CodeEditorComponent implements OnInit {
  templateVersionId: number;
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
    private editorService: EditorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  openSettings() {
    this.settingsVisible = true;
  }

  closeSettings() {
    this.settingsVisible = false;
  }

  manualRetrySave() {
    this.editorService.saveTemplate();
  }
}

enum TabValues {
  DESIGN = 'DESIGN',
  TEST = 'TEST',
  SETTINGS = 'SETTINGS',
}
