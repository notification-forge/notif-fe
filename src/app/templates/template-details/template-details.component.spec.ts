import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { GraphQLModule } from 'src/app/graphql/graphql.module';

import { TemplateDetailsComponent } from './template-details.component';

describe('TemplateDetailsComponent', () => {
  let component: TemplateDetailsComponent;
  let fixture: ComponentFixture<TemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzSkeletonModule, GraphQLModule, HttpClientModule],
      declarations: [TemplateDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
