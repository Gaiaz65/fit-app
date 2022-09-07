import { TrainingService } from './../training/training.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  private isAuth = false;
  constructor(
    private router: Router,
    private angAuth: AngularFireAuth,
    private trService: TrainingService
  ) {}

  innitAuthListener() {
    this.angAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuth = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
          this.trService.cancelSubscriptions();
          this.authChange.next(false);
          this.router.navigate(['/login']);
          this.isAuth = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.angAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.angAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  logout() {
    this.angAuth.auth.signOut();
  }

  isAuthentificated() {
    return this.isAuth;
  }
}
