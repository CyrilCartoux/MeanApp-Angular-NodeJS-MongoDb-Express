import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './../auth-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private timer: any;
  private token: string;
  private isLoggedIn = false;
  private authStatusListener = new Subject<boolean>();
  private userId: string;

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

  getUserId() {
    return this.userId;
  }

  signUpUser(email: string, password: string) {
    const data: AuthData = {
      email,
      password
    };
    this.http.post<AuthData>(BACKEND_URL + 'signup', data)
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  loginUser(email: string, password: string) {
    const data: AuthData = {
      email,
      password
    };
    this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + 'login', data)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.userId = response.userId;
          this.autologinTimer(expiresInDuration);
          this.isLoggedIn = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + (response.expiresIn * 1000));
          this.saveAuthData(response.token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autologin() {
    const authInfos = this.getAuthData();
    if (!authInfos) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfos.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfos.token;
      this.userId = authInfos.userId;
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

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  logoutUser() {
    this.token = null;
    this.isLoggedIn = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.timer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

}
