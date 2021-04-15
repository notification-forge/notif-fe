import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { TemplatesPageComponent } from './templates-page.component';

describe('TemplatesPageComponent', () => {
  let component: TemplatesPageComponent;
  let fixture: ComponentFixture<TemplatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDropDownModule],
      declarations: [TemplatesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
