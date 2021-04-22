import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TemplateDetailsComponent implements OnInit {
  @Input() templateUUID: string;
  @Input() templateID: string;
  @Output() onOpenCodeEditor: EventEmitter<null> = new EventEmitter();

  templateVersionList: (TemplateVersion | null)[];

  constructor(
    private getTemplateDetails: GetTemplateDetailsGQL,
    private createTemplateVersion: CreateTemplateVersionGQL
  ) {}

  ngOnInit(): void {
    this.getTemplateDetails.fetch({ id: this.templateID }).subscribe({
      next: (details) => {
        this.templateVersionList =
          details.data.template?.templateVersions || [];
        console.log(details.data.template?.templateVersions);
      },
    });
  }

  createVersion() {
    this.createTemplateVersion
      .mutate({ templateId: this.templateID })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    this.openCodeEditor();
  }

  openCodeEditor() {
    this.onOpenCodeEditor.emit();
  }
}
