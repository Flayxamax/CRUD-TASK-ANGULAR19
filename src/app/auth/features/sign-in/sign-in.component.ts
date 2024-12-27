import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';
import { GithubButtonComponent } from '../../ui/github-button/github-button.component';

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent, GithubButtonComponent],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;

      if (!email || !password) return;

      await this._authService.signIn({ email, password });

      toast.success('Inicio de sesión correctamente');
      this._router.navigate(['/tasks']);
    } catch (error) {
      toast.error('Ha ocurrido un problema al iniciar sesión');
      console.log(error);
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();

      toast.success('Inicio de sesión correctamente');
      this._router.navigate(['/tasks']);
    } catch (error) {
      toast.error('Ha ocurrido un problema al iniciar sesión');
      console.log(error);
    }
  }

  async submitWithGithub() {
    try {
      await this._authService.signInWithGithub();

      toast.success('Inicio de sesión correctamente');
      this._router.navigate(['/tasks']);
    } catch (error) {
      toast.error('Ha ocurrido un problema al iniciar sesión');
      console.log(error);
    }
  }
}
