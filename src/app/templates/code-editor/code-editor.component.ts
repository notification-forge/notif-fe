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

  tabValue = TabValues.DESIGN;
  readonly TAB_VALUES = TabValues;

  codeEditorHeight = window.innerHeight;
  designEditorOptions = { theme: 'vs-dark', language: 'html' };
  designCode: string = '<div> Hello world </div>';

  testEditorOptions = { theme: 'vs-dark', language: 'json' };
  testCode: string = '{\n\t"key": "value"\n}';

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.windowSize$.subscribe(
      (windowSize) => (this.codeEditorHeight = windowSize.height)
    );
  }

  onCloseCodeEditor() {
    this.closeCodeEditor.emit();
  }

  onDesignCodeChange(code: string) {
    this.designCode = code;
  }

  onTestCodeChange(code: string) {
    this.testCode = code;
  }
}

enum TabValues {
  DESIGN = 'DESIGN',
  TEST = 'TEST',
  SETTINGS = 'SETTINGS',
}
