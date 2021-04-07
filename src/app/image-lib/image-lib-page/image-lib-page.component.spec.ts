import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLibPageComponent } from './image-lib-page.component';

describe('ImageLibPageComponent', () => {
  let component: ImageLibPageComponent;
  let fixture: ComponentFixture<ImageLibPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageLibPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLibPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
