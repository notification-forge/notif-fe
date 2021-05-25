import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MessageType } from 'src/app/graphql/graphql';
import { EditorService } from '../editor.service';
import { emailTemplate } from './email-template';
import { teamsTemplate } from './teams-template';

@Component({
  selector: 'app-design-editor',
  templateUrl: './design-editor.component.html',
  styleUrls: ['./design-editor.component.scss'],
})
export class DesignEditorComponent implements OnInit, OnDestroy {
  @Output() openSettings = new EventEmitter<null>();

  settingsForm: FormGroup = this.editorService.settingsForm;
  designEditorOptions = { theme: 'vs-dark', language: 'html' };

  designCode: string;
  designCodeChange$: Subject<string> = new Subject<string>();
  type: MessageType;
  showPreview: boolean = true;

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.type = this.editorService.type;
    this.designEditorOptions.language =
      this.editorService.type === MessageType.Email ? 'html' : 'json';
    this.showPreview = this.editorService.type === MessageType.Email;
    this.designCode =
      this.editorService.designCodeBody ||
      (this.editorService.type === MessageType.Email
        ? emailTemplate
        : teamsTemplate);
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
