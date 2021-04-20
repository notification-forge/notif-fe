import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginBody, LoginResponse, TokenDecoded } from './models/api.models';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';

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
      // TODO: Change to Whoami. This is temporary until whoami is up
      const { sub }: TokenDecoded = jwt_decode(token);
      const user: User = {
        username: sub,
        token,
      };

      this.user$.next(user);
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
        const { sub }: TokenDecoded = jwt_decode(accessToken);
        const user: User = {
          username: sub,
          token: accessToken,
        };

        this.tokenService.token = accessToken;
        this.user$.next(user);
      });
  }

  logout() {
    this.tokenService.token = null;
    this.user$.next(null);
    this.router.navigate(['login']);
  }
}

interface User {
  username: string;
  token: string;
}
