import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.scss'],
})
export class TestEditorComponent implements OnInit {
  testEditorOptions = { theme: 'vs-dark', language: 'json' };
  testCode: string = '{\n\t"key": "value"\n}';

  constructor() {}

  ngOnInit(): void {}

  onTestCodeChange(code: string) {
    this.testCode = code;
  }
}
