import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationButtonText: string = 'Login'
  submitted: boolean = false;
  
  // Use the names `name`, `email`, `password` for the form controls.  
  name: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(6)
  ]));
  email: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    new EmailValidatorDirective().validate
  ]));
  password: FormControl = new FormControl('', Validators.compose([
    Validators.required
  ]));

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit(registrationItem: any) {
    this.submitted = true;
    console.log(registrationItem);
  }
}
