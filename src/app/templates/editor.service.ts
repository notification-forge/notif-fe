import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}
}
