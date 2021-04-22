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
  @Output() onCreateVersion: EventEmitter<null> = new EventEmitter();

  templateVersionList: (TemplateVersion | null)[];

  constructor(private getTemplateDetails: GetTemplateDetailsGQL) {}

  ngOnInit(): void {
    this.getTemplateDetails.fetch({ id: this.templateID }).subscribe({
      next: (details) => {
        this.templateVersionList =
          details.data.template?.templateVersions || [];
      },
    });
  }

  createVersion() {
    this.onCreateVersion.emit();
  }
}
