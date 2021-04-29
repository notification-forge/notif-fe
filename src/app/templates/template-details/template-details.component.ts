import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import {
  CreateTemplateVersionGQL,
  GetTemplateDetailsGQL,
  TemplateVersion,
} from 'src/app/graphql/graphql';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit, OnDestroy {
  @Input() templateUUID: string;
  @Input() templateID: number;
  @Output() onOpenCodeEditor: EventEmitter<number> = new EventEmitter();

  templateVersionList: (TemplateVersion | null)[];
  onDestroy$: Subject<null> = new Subject<null>();
  detailsIsLoading = false;

  constructor(
    private getTemplateDetails: GetTemplateDetailsGQL,
    private createTemplateVersion: CreateTemplateVersionGQL
  ) {}

  ngOnInit(): void {
    this.fetchTemplateDetails();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  fetchTemplateDetails() {
    this.detailsIsLoading = true;
    this.getTemplateDetails
      .fetch({ id: `${this.templateID}` })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: ({ data, loading }) => {
          this.detailsIsLoading = loading;
          this.templateVersionList = data.template?.templateVersions || [];
        },
      });
  }

  createVersion() {
    this.createTemplateVersion
      .mutate({ templateId: `${this.templateID}` })
      .pipe(
        switchMap((res) => {
          this.openCodeEditor(res.data?.createTemplateVersion.id || -1);
          return this.getTemplateDetails.fetch(
            { id: `${this.templateID}` },
            { fetchPolicy: 'network-only' }
          );
        })
      )
      .subscribe({
        next: (details) => {
          this.templateVersionList =
            details.data.template?.templateVersions || [];
        },
      });
  }

  openCodeEditor(templateVersionId: number) {
    this.onOpenCodeEditor.emit(templateVersionId);
  }
}
