import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './../auth-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    this.http.post<{ token: string, userId: string }>('http://localhost:3000/login', data)
      .subscribe(response => {
        console.log(response);
        this.token = response.token;
        if (this.token) {
          this.isLoggedIn = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logoutUser() {
    this.token = null;
    this.isLoggedIn = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

}
