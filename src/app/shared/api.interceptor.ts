import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {}

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
          this.tokenService.token = null;
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
