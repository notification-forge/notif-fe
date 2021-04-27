export interface User {
  username: string;
  name: string;
  apps: App[];
  token: string;
}

export interface App {
  appCode: string;
  apiToken: string;
  appName: string;
  appStatus: string;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

export interface TokenDecoded {
  exp: number;
  iat: number;
  roles: string[];
  sub: string; // username
}

export interface WhoAmIResponse {
  username: string;
  name: string;
  dateIssued: string;
  apps: App[];
}
