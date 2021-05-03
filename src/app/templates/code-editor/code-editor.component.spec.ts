import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NzButtonModule,
        NzRadioModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [CodeEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
