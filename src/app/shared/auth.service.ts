import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginBody, LoginResponse } from './models/api.models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient
  ) {
    this.restoreSession();
  }

  restoreSession() {
    const token = this.tokenService.token;
    if (token) {
      // fetch api for user details
    } else {
      this.user$.next(null);
    }
  }

  login({ username, password }: LoginBody) {
    // Temp
    this.http
      .post<LoginResponse>('api/v1/auth/login', {
        username,
        password,
      })
      .subscribe(({ accessToken }) => {
        const user: User = {
          username,
          token: accessToken,
        };

        this.user$.next(user);
      });
  }

  logout() {
    this.user$.next(null);
    this.router.navigate(['login']);
  }
}

interface User {
  username: string;
  token: string;
}
