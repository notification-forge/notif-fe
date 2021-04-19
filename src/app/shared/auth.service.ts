import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private tokenService: TokenService, private router: Router) {
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

  login(username: string, password: string) {
    // Temp
    this.user$.next({
      username,
      token: `${username}${password}`,
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
