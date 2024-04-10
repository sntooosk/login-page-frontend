import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  URL: string = 'https://login-app-backend-hx35.onrender.com/auth';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.URL}/login`, { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.URL}/register`, { name, email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }
}
