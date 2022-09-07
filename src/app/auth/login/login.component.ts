import { Subscription } from 'rxjs';
import { UIService } from './../../shared/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs:Subscription

  constructor(private authServise: AuthService,
    private uiService:UIService) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      loadingStatus => {
        this.isLoading = loadingStatus
      }
    )
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    this.authServise.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
  ngOnDestroy() {
    this.loadingSubs.unsubscribe()
  }
}
