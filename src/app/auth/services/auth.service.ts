import { AuthData } from './../auth-data';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
    this.http.post<AuthData>('http://localhost:3000/login', data)
      .subscribe(response => {
        console.log(response)
      })
  }

}
