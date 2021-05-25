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
    templateVersionName: [''],
    subject: ['', Validators.required],
    sender: ['', Validators.required],
    recipients: [''],
    ccRecipients: [''],
    bccRecipients: [''],
    importance: [''],
    hasAttachments: [''],
  });
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
    this.status = status;

    const settingsJson = JSON.parse(settings);
    const defaultEmailSettings = {
      templateVersionName: '',
      subject: '',
      sender: '',
      recipients: '',
      ccRecipients: '',
      bccRecipients: '',
      importance: '',
      hasAttachments: '',
    };

    this.settingsForm.setValue({
      ...defaultEmailSettings,
      ...settingsJson,
      templateVersionName,
    });
  }

  saveTemplate() {
    this.saveLoading$.next(true);
    const settingValues = JSON.parse(JSON.stringify(this.settingsForm.value));
    const templateVersionName = settingValues.templateVersionName;

    delete settingValues['templateVersionName'];

    this.updateTemplateVersion
      .mutate({
        id: `${this._templateVersionId}`,
        name: templateVersionName,
        settings: JSON.stringify(settingValues),
        body: this._designCodeBody || '',
        status: this.status,
        plugins: [],
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

  publishTemplate() {
    const settingValues = this.settingsForm.value;
    const templateVersionName = settingValues.templateVersionName;

    delete settingValues['templateVersionName'];

    return this.updateTemplateVersion.mutate({
      id: `${this._templateVersionId}`,
      name: templateVersionName,
      settings: JSON.stringify(settingValues),
      body: this._designCodeBody || '',
      status: TemplateStatus.Published,
      plugins: [],
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
