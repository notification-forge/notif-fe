import { TestBed } from '@angular/core/testing';

import { ApiInterceptor } from './api.interceptor';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ApiInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ApiInterceptor = TestBed.inject(ApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
