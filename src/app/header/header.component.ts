import { Subscription } from 'rxjs';
import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  authStatusSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService.getAuthStatus()
      .subscribe(status => {
        this.isLoggedIn = status;
      });
  }
  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }

}
