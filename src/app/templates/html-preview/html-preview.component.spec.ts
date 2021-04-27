import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustCssPipe } from '../trust-css.pipe';

import { HtmlPreviewComponent } from './html-preview.component';

describe('HtmlPreviewComponent', () => {
  let component: HtmlPreviewComponent;
  let fixture: ComponentFixture<HtmlPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlPreviewComponent, TrustCssPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
