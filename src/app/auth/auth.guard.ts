import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";


@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService,
    private router:Router){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthentificated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    };
  }
}
