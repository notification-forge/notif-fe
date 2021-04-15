import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { TestEditorComponent } from './test-editor.component';

describe('TestEditorComponent', () => {
  let component: TestEditorComponent;
  let fixture: ComponentFixture<TestEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestEditorComponent, MonacoEditorModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
