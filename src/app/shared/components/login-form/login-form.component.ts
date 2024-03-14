import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  loginButtonText = 'Login';
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  submitButtonClick(event: Event) {
    this.loginForm.onSubmit(event);
  }

  onSubmit(loginItem: any) {
    console.log(loginItem);
  }
}
