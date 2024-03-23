import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  constructor(private router: Router) {}

  submitButtonClick(event: Event) {
    if (this.loginForm.invalid)
      return;

    this.loginForm.onSubmit(event);
  }

  onSubmit(loginItem: any) {
    console.log(loginItem);
    this.router.navigate(['/coruses']);
  }
}
