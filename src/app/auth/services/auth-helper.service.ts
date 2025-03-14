import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  private jwtToken: string | null = null;

  constructor() {}

  public setJwtToken(token: string) {
    this.jwtToken = token;
  }

  public getJwtToken(): string | null {
    return this.jwtToken;
  }
}

