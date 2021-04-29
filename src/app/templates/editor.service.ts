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
  designCodeBody: string;
  templateVersionName: string;
  status: TemplateStatus;

  constructor(private fb: FormBuilder) {}

  initializeEmail(
    designCodeBody: string,
    templateVersionName: string,
    status: TemplateStatus
  ) {
    this.designCodeBody = designCodeBody;
    this.templateVersionName = templateVersionName;
    this.status = status;
  }
}
