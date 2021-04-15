import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustCssPipe } from '../trust-css.pipe';

import { DesignEditorComponent } from './design-editor.component';

describe('DesignEditorComponent', () => {
  let component: DesignEditorComponent;
  let fixture: ComponentFixture<DesignEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
