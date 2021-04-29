import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TemplateStatus } from '../graphql/graphql';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private _designCodeBody: string | null;
  private _templateVersionId: number;
  saveLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  settingsForm: FormGroup = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    cc: [''],
    bcc: [''],
  });
  templateVersionName: string;
  status: TemplateStatus;

  constructor(private fb: FormBuilder) {}

  initializeEmail(
    templateVersionId: number,
    designCodeBody: string | null,
    templateVersionName: string,
    status: TemplateStatus
  ) {
    this._templateVersionId = templateVersionId;
    this._designCodeBody = designCodeBody;
    this.templateVersionName = templateVersionName;
    this.status = status;
  }

  saveTemplate() {
    console.log(
      'saving to backend with template version id',
      this._templateVersionId
    );
    this.saveLoading$.next(true);
    setTimeout(() => this.saveLoading$.next(false), 1000);
  }

  get designCodeBody() {
    return this._designCodeBody;
  }

  set designCodeBody(newBody: string | null) {
    this._designCodeBody = newBody;
    this.saveTemplate();
  }
}
