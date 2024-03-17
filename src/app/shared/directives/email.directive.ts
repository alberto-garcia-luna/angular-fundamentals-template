import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        }
    ]
})
export class EmailValidatorDirective implements Validator {
    // Add your code here
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return emailValidatorFunction(regExp)(control);
    }
}
export function emailValidatorFunction(regExp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const validEmail = regExp.test(control.value);
        return !validEmail 
            ? {emailValidator: { value: control.value }} 
            : null;
    };
}