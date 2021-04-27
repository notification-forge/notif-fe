import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TemplateDetailsComponent } from './template-details.component';

describe('TemplateDetailsComponent', () => {
  let component: TemplateDetailsComponent;
  let fixture: ComponentFixture<TemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzSkeletonModule, HttpClientTestingModule, ApolloTestingModule],
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
