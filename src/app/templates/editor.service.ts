import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TemplateStatus, UpdateTemplateVersionGQL } from '../graphql/graphql';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private _designCodeBody: string | null;
  private _templateVersionId: number;

  saveLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saveSuccess$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  settingsForm: FormGroup = this.fb.group({
    subject: ['', Validators.required],
    sender: ['', Validators.required],
    recipients: [''],
    ccRecipients: [''],
    bccRecipients: [''],
    importance: [''],
    hasAttachments: [''],
  });
  templateVersionName: string;
  status: TemplateStatus;

  constructor(
    private fb: FormBuilder,
    private updateTemplateVersion: UpdateTemplateVersionGQL
  ) {}

  initializeEmail(
    templateVersionId: number,
    designCodeBody: string | null,
    templateVersionName: string,
    settings: string,
    status: TemplateStatus
  ) {
    this._templateVersionId = templateVersionId;
    this._designCodeBody = designCodeBody;
    this.templateVersionName = templateVersionName;
    this.status = status;

    const settingsJson = JSON.parse(settings);
    this.settingsForm.setValue(settingsJson);
  }

  saveTemplate() {
    this.saveLoading$.next(true);
    this.updateTemplateVersion
      .mutate({
        id: `${this._templateVersionId}`,
        name: this.templateVersionName,
        settings: JSON.stringify(this.settingsForm.value),
        body: this._designCodeBody || '',
        status: this.status,
      })
      .subscribe({
        next: (_) => {
          this.saveSuccess$.next(true);
          this.saveLoading$.next(false);
        },
        error: () => {
          this.saveSuccess$.next(false);
          this.saveLoading$.next(false);
        },
      });
  }

  get designCodeBody() {
    return this._designCodeBody;
  }

  set designCodeBody(newBody: string | null) {
    this._designCodeBody = newBody;
    this.saveTemplate();
  }
}
