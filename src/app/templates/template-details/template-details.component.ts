import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
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

  templateVersionList: (TemplateVersion | null)[];
  onDestroy$: Subject<null> = new Subject<null>();
  detailsIsLoading = false;

  constructor(
    private getTemplateDetails: GetTemplateDetailsGQL,
    private createTemplateVersion: CreateTemplateVersionGQL,
    private router: Router
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
          console.log(data);
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
          this.router.navigate([
            'templates',
            'editor',
            res.data?.createTemplateVersion.id || -1,
          ]);
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
}
