import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';


@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  constructor(private router:Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfuly();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessfuly()
  }

  logout() {
    this.user = null as any;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    console.log (this.user)
    return this.user ;

  }

  authSuccessfuly() {
     this.authChange.next(true);
     this.router.navigate(['/training']);
  }
}
