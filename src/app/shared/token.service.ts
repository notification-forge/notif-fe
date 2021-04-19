import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string;
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

  set token(token: string) {
    localStorage.setItem(this._tokenKey, token);
    this._token = token;
  }
}
