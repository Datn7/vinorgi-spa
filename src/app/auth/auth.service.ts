import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          this.setToken(res.token);

          //  this is crucial
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        })
      );
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
    if (typeof window === 'undefined') return null;

    const raw = localStorage.getItem('user');

    // If the string is literally "undefined", don't parse
    if (!raw || raw === 'undefined') return null;

    try {
      return JSON.parse(raw);
    } catch {
      console.warn('Invalid JSON in localStorage for key "user"');
      return null;
    }
  }
}
