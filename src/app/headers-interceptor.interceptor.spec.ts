import { TestBed } from '@angular/core/testing';

import { HeadersInterceptorInterceptor } from './headers-interceptor.interceptor';

describe('HeadersInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeadersInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeadersInterceptorInterceptor = TestBed.inject(HeadersInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
