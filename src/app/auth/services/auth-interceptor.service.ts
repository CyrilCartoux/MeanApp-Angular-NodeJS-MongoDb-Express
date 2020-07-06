import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (!token) {
      return next.handle(req);
    }
    const authRequest = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + token)
    });
    return next.handle(authRequest);
  }
}
