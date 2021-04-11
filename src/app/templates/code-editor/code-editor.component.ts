import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements OnInit {
  @Input() codeEditorVisible: boolean;
  @Output() closeCodeEditor: EventEmitter<null> = new EventEmitter();

  codeEditorHeight = window.innerHeight;
  editorOptions = { theme: 'vs-dark', language: 'html' };
  code: string = '<div> Hello world </div>';

  constructor() {}

  ngOnInit(): void {}

  onCloseCodeEditor() {
    this.closeCodeEditor.emit();
  }
}
