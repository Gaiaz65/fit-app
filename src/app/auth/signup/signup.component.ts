import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxDate:any;

  constructor(
    private authServise: AuthService
  ) {}
  ngOnInit(): void {
      this.maxDate = new Date();
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form:NgForm){
   console.log (form)
  }
}
