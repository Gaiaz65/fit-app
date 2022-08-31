import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter<void>();
  isAuth = false;
  authSub: Subscription;
  constructor(
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe (authStatus=> {
        this.isAuth = authStatus});
    }

    onClose() {
      this.closeEvent.emit();
      this.onLogout();
    }

    onLogout(){
      this.authService.logout()
    }

    ngOnDestroy() {
      this.authSub.unsubscribe();
    }
}
