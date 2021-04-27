import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { GetTemplateVersionDetailsGQL } from 'src/app/graphql/graphql';

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

  constructor(
    private getTemplateVersionDetails: GetTemplateVersionDetailsGQL
  ) {}

  ngOnInit(): void {
    console.log('init');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.codeEditorVisible && changes.codeEditorVisible.currentValue) {
      this.getTemplateVersionDetailsById(
        changes.templateVersionId.currentValue
      );
    }
  }

  getTemplateVersionDetailsById(templateVersionId: number) {
    console.log(
      'fetching api for template version details...',
      templateVersionId
    );
  }

  onCloseCodeEditor() {
    this.closeCodeEditor.emit();
  }

  openSettings() {
    console.log('opening settings');
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
