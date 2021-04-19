import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-settings-editor',
  templateUrl: './settings-editor.component.html',
  styleUrls: ['./settings-editor.component.scss'],
})
export class SettingsEditorComponent implements OnInit {
  settingsForm: FormGroup = this.editorService.settingsForm;

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {}

  onFormSubmit(): void {
    console.log(this.settingsForm.value);
  }
}
