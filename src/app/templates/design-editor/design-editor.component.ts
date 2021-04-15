import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-editor',
  templateUrl: './design-editor.component.html',
  styleUrls: ['./design-editor.component.scss'],
})
export class DesignEditorComponent implements OnInit {
  designEditorOptions = { theme: 'vs-dark', language: 'html' };
  designCode: string = '<div> Hello world </div>';

  constructor() {}

  ngOnInit(): void {}

  onDesignCodeChange(code: string) {
    this.designCode = code;
  }
}
