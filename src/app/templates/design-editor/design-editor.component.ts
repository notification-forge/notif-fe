import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EditorService } from '../editor.service';
import { template } from './email-template';

@Component({
  selector: 'app-design-editor',
  templateUrl: './design-editor.component.html',
  styleUrls: ['./design-editor.component.scss'],
})
export class DesignEditorComponent implements OnInit, OnChanges {
  @Output() openSettings = new EventEmitter<null>();
  @Input() initialDesignCode: string | null;

  settingsForm: FormGroup = this.editorService.settingsForm;
  designEditorOptions = { theme: 'vs-dark', language: 'html' };

  designCode: string;
  designCodeChange$: Subject<string> = new Subject<string>();

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.designCodeChange$.pipe(debounceTime(1000)).subscribe((newBody) => {
      this.designCode = newBody;
      this.editorService.designCodeBody = newBody;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.initialDesignCode) {
      this.designCode = changes.initialDesignCode.currentValue || template;
    }
  }

  onDesignCodeChange(code: string) {
    this.designCodeChange$.next(code);
  }

  onOpenSettings() {
    this.openSettings.emit();
  }
}
