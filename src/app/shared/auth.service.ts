import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, switchMap } from 'rxjs/operators';
import {
  LoginBody,
  LoginResponse,
  User,
  WhoAmIResponse,
} from './models/api.models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient,
    private message: NzMessageService
  ) {
    this.restoreSession();
  }

  restoreSession(): void {
    const token = this.tokenService.token;
    if (token) {
      this.whoami()
        .pipe(
          map(({ username, name, apps }) => {
            const user: User = {
              username,
              name,
              apps,
              token,
            };

            return user;
          })
        )
        .subscribe({
          next: (user: User) => {
            this.user$.next(user);
          },
          error: () => {
            this.logout();
          },
        });
    } else {
      this.user$.next(null);
    }
  }

  login({ username, password }: LoginBody): void {
    // Temp
    this.http
      .post<LoginResponse>('api/v1/auth/login', {
        username,
        password,
      })
      .pipe(
        switchMap(({ accessToken }) => {
          this.tokenService.token = accessToken;
          return this.whoami();
        }),
        map(({ username, name, apps }) => {
          const token = this.tokenService.token || ''; // if we can get the value of whoami, the token is not null
          const user: User = {
            username,
            name,
            apps,
            token,
          };

          return user;
        })
      )
      .subscribe({
        next: (user: User) => {
          this.user$.next(user);
        },
        error: () => {
          this.message.error('Invalid username and password');
        },
      });
  }

  whoami(): Observable<WhoAmIResponse> {
    return this.http.get<WhoAmIResponse>('api/v1/whoami');
  }

  logout() {
    this.tokenService.token = null;
    this.user$.next(null);
    this.router.navigate(['login']);
  }
}
