import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      this.isLoading = false;
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(form.value);
    this.authService.signUpUser(email, password);
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

}
