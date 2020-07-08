import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

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

  onLogin(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      this.isLoading = false;
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email, password);
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
