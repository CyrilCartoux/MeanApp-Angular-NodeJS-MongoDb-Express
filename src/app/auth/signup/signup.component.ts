import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  private authSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus()
      .subscribe((isAuth) => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      this.isLoading = false;
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signUpUser(email, password);
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  OnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
