import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './models/api.models';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
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
          this.user$.next(null);
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
