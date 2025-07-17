import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5151/api/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  register(data: { username: string; email: string; password: string }) {
    return this.http
      .post<any>(`${this.apiUrl}/register`, data)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  login(data: { email: string; password: string }) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, data)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getCurrentUser() {
  return JSON.parse(localStorage.getItem('user') || '{}');
}
}
