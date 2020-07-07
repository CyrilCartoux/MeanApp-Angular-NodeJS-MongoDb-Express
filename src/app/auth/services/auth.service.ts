import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './../auth-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private timer: any;
  private token: string;
  private isLoggedIn = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken(): string {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isLoggedIn;
  }

  signUpUser(email: string, password: string) {
    const data: AuthData = {
      email,
      password
    };
    this.http.post<AuthData>('http://localhost:3000/signup', data)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      });
  }

  loginUser(email: string, password: string) {
    const data: AuthData = {
      email,
      password
    };
    this.http.post<{ token: string, expiresIn: number }>('http://localhost:3000/login', data)
      .subscribe(response => {
        this.token = response.token;

        if (this.token) {
          console.log(response);
          const expiresInDuration = response.expiresIn;
          this.autologinTimer(expiresInDuration);
          this.isLoggedIn = true;
          this.authStatusListener.next(true);
          // store authData under localstorage
          const now = new Date();
          const expirationDate = new Date(now.getTime() + (response.expiresIn * 1000));
          this.saveAuthData(response.token, expirationDate);
          this.router.navigate(['/']);
        }
      });
  }

  autologin() {
    const authInfos = this.getAuthData();
    const now = new Date();
    const expiresIn = authInfos.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfos.token;
      this.isLoggedIn = true;
      this.autologinTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  autologinTimer(expiresInDuration: number) {
    this.timer = setTimeout(() => {
      this.logoutUser();
    }, expiresInDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expirationDate')
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

  logoutUser() {
    this.token = null;
    this.isLoggedIn = false;
    this.authStatusListener.next(false);
    clearTimeout(this.timer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

}
