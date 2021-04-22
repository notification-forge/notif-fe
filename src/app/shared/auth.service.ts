import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  LoginBody,
  LoginResponse,
  TokenDecoded,
  WhoAmIResponse,
} from './models/api.models';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { map, switchMap } from 'rxjs/operators';

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

  restoreSession(): void {
    const token = this.tokenService.token;
    // if (token) {
    //   // TODO: Change to Whoami. This is temporary until whoami is up
    //   const { sub }: TokenDecoded = jwt_decode(token);
    //   const user: User = {
    //     username: sub,
    //     token,
    //   };

    //   this.user$.next(user);
    // } else {
    //   this.user$.next(null);
    // }
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
      .subscribe((user: User) => {
        console.log(user);
        this.user$.next(user);
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

interface User {
  username: string;
  name: string;
  apps: string[];
  token: string;
}
