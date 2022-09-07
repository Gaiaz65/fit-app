import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxDate: any;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authServise: AuthService,
      private uiService:UIService) {}

  ngOnInit(): void {
     this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
       (loadingStatus) => {
         this.isLoading = loadingStatus;
       }
     );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authServise.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs){
      this.loadingSubs.unsubscribe()
    }
  }
}
