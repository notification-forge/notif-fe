import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string | null;
  private readonly _tokenKey: string = 'NTF_AUTH_TOKEN';

  constructor() {
    const token = localStorage.getItem(this._tokenKey);
    if (token) {
      this._token = token;
    }
  }

  get token() {
    return this._token;
  }

  set token(token: string | null) {
    if (!token) {
      localStorage.removeItem(this._tokenKey);
      this._token = null;
    } else {
      localStorage.setItem(this._tokenKey, token);
      this._token = token;
    }
  }
}
