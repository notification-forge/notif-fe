import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService } from '../editor.service';
import { template } from './email-template';

@Component({
  selector: 'app-design-editor',
  templateUrl: './design-editor.component.html',
  styleUrls: ['./design-editor.component.scss'],
})
export class DesignEditorComponent implements OnInit {
  @Output() openSettings = new EventEmitter<null>();

  settingsForm: FormGroup = this.editorService.settingsForm;
  designEditorOptions = { theme: 'vs-dark', language: 'html' };
  designCode: string = template;

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {}

  onDesignCodeChange(code: string) {
    this.designCode = code;
  }

  onOpenSettings() {
    this.openSettings.emit();
  }
}
