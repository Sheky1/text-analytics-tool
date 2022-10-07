import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token: any = '';

  constructor() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
    }
  }

  placeToken(token: any) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
