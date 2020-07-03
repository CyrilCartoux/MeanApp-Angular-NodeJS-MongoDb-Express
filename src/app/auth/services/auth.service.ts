import { User } from './../user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUpUser(email: string, password: string) {
    const newUser: User = {
      email,
      password
    };
    this.http.post<User>('http://localhost:3000/signup', newUser)
      .subscribe((data) => {
        console.log(data)
      })
  }

}
