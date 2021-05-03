import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private injector: Injector
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.token;
    if (!!token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          (error.status === 401 || error.status === 403) &&
          this.router.url !== '/login'
        ) {
          const auth = this.injector.get(AuthService);
          auth.logout();
        }
        return throwError(error);
      })
    );
  }
}
