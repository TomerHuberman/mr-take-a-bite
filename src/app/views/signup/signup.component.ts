import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CustomValidatorDirective } from 'src/app/validators/name-taken';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  form!: FormGroup;
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private customVal: CustomValidatorDirective
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, customVal.nameTaken], []],
    });
    this.formLogin = this.fb.group({
      name: ['', [Validators.required], []],
    });
  }
  onSignup() {
    const { name } = this.form.value;
    this.userService.signup(name);
    this.router.navigateByUrl('');
  }
  login() {
    const { name } = this.formLogin.value;
    this.userService.login(name);
    this.router.navigateByUrl('');
  }
}
