import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateTemplateVersionGQL } from 'src/app/graphql/graphql';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {
  @Input() templateID: string;
  @Output() onCreateVersion: EventEmitter<null> = new EventEmitter();

  constructor(private createTemplateVersion: CreateTemplateVersionGQL) {}

  ngOnInit(): void {
    console.log('template version id', this.templateID);
  }

  createVersion() {
    this.onCreateVersion.emit();
  }
}
