import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Directive } from '@angular/core';

@Directive({
  selector: '[customValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomValidatorDirective,
      multi: true,
    },
  ],
})
export class CustomValidatorDirective implements Validator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return { custom: true };
  }

  nameTaken = (control: AbstractControl) => {
    const isTaken = !!this.userService.users.find(
      (user) => user.name === control.value
    );
    return isTaken ? { nameTaken: true } : null;
  };
}
