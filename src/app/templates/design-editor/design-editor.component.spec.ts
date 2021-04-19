import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrustCssPipe } from '../trust-css.pipe';

import { DesignEditorComponent } from './design-editor.component';

describe('DesignEditorComponent', () => {
  let component: DesignEditorComponent;
  let fixture: ComponentFixture<DesignEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [DesignEditorComponent, TrustCssPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
