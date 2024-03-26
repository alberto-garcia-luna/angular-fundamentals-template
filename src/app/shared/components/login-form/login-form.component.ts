import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  loginButtonText: string = 'Login';
  submitted: boolean = false;

  constructor(private router: Router,
    private authService: AuthService) {
  }

  submitButtonClick(event: Event) {
    if (this.loginForm.invalid)
      return;

    this.loginForm.onSubmit(event);
  }

  onSubmit(loginItem: any) {
    console.log(loginItem);

    this.authService.login({
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
      name: ''
    }).subscribe(() => {
      this.router.navigate(['/coruses']);
    });    
  }
}
