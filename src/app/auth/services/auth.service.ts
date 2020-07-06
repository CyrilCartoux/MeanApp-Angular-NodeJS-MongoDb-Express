import { AuthData } from './../auth-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return this.token;
  }

  signUpUser(email: string, password: string) {
    const data: AuthData = {
      email,
      password
    };
    this.http.post<AuthData>('http://localhost:3000/signup', data)
      .subscribe((response) => {
        console.log(response);
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
      });
  }

}
