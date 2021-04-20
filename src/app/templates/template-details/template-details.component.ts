import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {
  @Input() templateID: string;
  @Output() onCreateVersion: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  createVersion() {
    this.onCreateVersion.emit();
  }
}
