import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private tokenService: TokenService) {
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
}

interface User {
  username: string;
  token: string;
}
