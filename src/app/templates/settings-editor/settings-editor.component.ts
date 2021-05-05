import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-settings-editor',
  templateUrl: './settings-editor.component.html',
  styleUrls: ['./settings-editor.component.scss'],
})
export class SettingsEditorComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup = this.editorService.settingsForm;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.settingsForm.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((_) => {
        this.editorService.saveTemplate();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
