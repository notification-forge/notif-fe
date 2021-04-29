import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplateStatus } from '../graphql/graphql';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  settingsForm: FormGroup = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    cc: [''],
    bcc: [''],
  });
  private _designCodeBody: string | null;
  templateVersionName: string;
  status: TemplateStatus;

  constructor(private fb: FormBuilder) {}

  initializeEmail(
    designCodeBody: string | null,
    templateVersionName: string,
    status: TemplateStatus
  ) {
    this._designCodeBody = designCodeBody;
    this.templateVersionName = templateVersionName;
    this.status = status;
  }

  get designCodeBody() {
    return this._designCodeBody;
  }

  set designCodeBody(newBody: string | null) {
    this._designCodeBody = newBody;
  }
}
