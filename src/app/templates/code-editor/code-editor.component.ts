import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LayoutService } from 'src/app/shared/layout.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CodeEditorComponent implements OnInit {
  @Input() codeEditorVisible: boolean;
  @Output() closeCodeEditor: EventEmitter<null> = new EventEmitter();

  codeEditorHeight = window.innerHeight;
  editorOptions = { theme: 'vs-dark', language: 'html' };
  code: string = '<div> Hello world </div>';

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.windowSize$.subscribe(
      (windowSize) => (this.codeEditorHeight = windowSize.height)
    );
  }

  onCloseCodeEditor() {
    this.closeCodeEditor.emit();
  }

  onCodeChange(code: string) {
    this.code = code;
  }
}
