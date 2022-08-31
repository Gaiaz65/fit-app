import { AuthService } from './../../auth/auth.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavEvent = new EventEmitter<void>();
  authStatusChanged!: Subscription;
  @Output() isAuth: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authStatusChanged = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy(): void {
    this.authStatusChanged.unsubscribe;
  }

  onToggleSidenav() {
    this.sidenavEvent.emit();
  }

  onLogout(){
    this.authService.logout()
  }
}
