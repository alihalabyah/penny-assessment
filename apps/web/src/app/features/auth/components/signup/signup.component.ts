import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { signup } from '@/app/store/actions/auth.actions';
import { selectAuthError, selectIsLoading } from '@/app/store/selectors/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage$ = this.store.select(selectAuthError);
  isLoading$ = this.store.select(selectIsLoading);
  showLoginButton = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    this.errorMessage$.subscribe(error => {
      if (error?.includes('Email already exists')) {
        this.showLoginButton = true;
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, name } = this.signupForm.value;
      this.store.dispatch(signup({ email, password, name }));
    }
  }
}
