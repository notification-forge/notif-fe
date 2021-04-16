import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-editor',
  templateUrl: './settings-editor.component.html',
  styleUrls: ['./settings-editor.component.scss'],
})
export class SettingsEditorComponent implements OnInit {
  settingsForm: FormGroup = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    cc: [''],
    bcc: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onFormSubmit(): void {
    console.log(this.settingsForm.value);
  }
}
