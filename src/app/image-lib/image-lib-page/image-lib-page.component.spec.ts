import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconTestModule } from 'src/app/nz-icon-test/nz-icon-test.module';

import { ImageLibPageComponent } from './image-lib-page.component';

describe('ImageLibPageComponent', () => {
  let component: ImageLibPageComponent;
  let fixture: ComponentFixture<ImageLibPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NzInputModule,
        NzSelectModule,
        NzButtonModule,
        NzIconTestModule,
        NzCardModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
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
