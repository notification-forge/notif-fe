import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { TestEditorComponent } from './test-editor.component';

describe('TestEditorComponent', () => {
  let component: TestEditorComponent;
  let fixture: ComponentFixture<TestEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonacoEditorModule.forRoot()],
      declarations: [TestEditorComponent],
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
