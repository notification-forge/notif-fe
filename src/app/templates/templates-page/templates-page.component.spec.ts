import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { GraphQLModule } from 'src/app/graphql/graphql.module';

import { TemplatesPageComponent } from './templates-page.component';

describe('TemplatesPageComponent', () => {
  let component: TemplatesPageComponent;
  let fixture: ComponentFixture<TemplatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NzDropDownModule,
        NzFormModule,
        FormsModule,
        ReactiveFormsModule,
        NzDropDownModule,
        NzRadioModule,
        NzMessageModule,
        RouterTestingModule,
        HttpClientModule,
        GraphQLModule,
      ],
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
