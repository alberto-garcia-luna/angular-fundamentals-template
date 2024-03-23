import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;

  constructor(private router: Router,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  onSubmit(registrationItem: any) {
    this.submitted = true;
    if (this.registrationForm.invalid)
      return;

    console.log(registrationItem);
    this.router.navigate(['/coruses']);
  }

  createRegistrationForm(){
    this.name = this.fb.control('', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ]));
    this.email = this.fb.control('', Validators.compose([
      Validators.required,
      new EmailValidatorDirective().validate
    ]));
    this.password = this.fb.control('', Validators.compose([
      Validators.required
    ]));

    this.registrationForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }
}
