import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  private jwtToken: string | null = null;

  constructor() {}

  public setJwtToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem('jwt_token', token);  // También guarda en localStorage
    sessionStorage.setItem('jwt_token', token); // O en sessionStorage como respaldo
    console.log("✅ Token guardado en auth-helper:", token);
}


public getJwtToken(): string | null {
  return localStorage.getItem(this.JWT_TOKEN) || sessionStorage.getItem(this.JWT_TOKEN);
}

}
