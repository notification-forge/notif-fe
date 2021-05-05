import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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
export class DesignEditorComponent implements OnInit, OnDestroy {
  @Output() openSettings = new EventEmitter<null>();
  @Input() initialDesignCode: string | null;

  settingsForm: FormGroup = this.editorService.settingsForm;
  designEditorOptions = { theme: 'vs-dark', language: 'html' };

  designCode: string;
  designCodeChange$: Subject<string> = new Subject<string>();

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.designCode = this.editorService.designCodeBody || template;
    this.designCodeChange$.pipe(debounceTime(1000)).subscribe((newBody) => {
      this.designCode = newBody;
      this.editorService.designCodeBody = newBody;
    });
  }

  ngOnDestroy() {}

  onDesignCodeChange(code: string) {
    this.designCodeChange$.next(code);
  }

  onOpenSettings() {
    this.openSettings.emit();
  }
}
