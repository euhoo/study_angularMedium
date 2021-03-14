import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/login.action';

@Component({
  selector: 'mc-login', // mc - префикс для того, чтобы понимать, что это наш,а не сторонний компонент
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  isSubmitDisabled: boolean;
  backendErrors$: Observable<BackendErrorsInterface> | null;

  constructor(private fb: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }
  initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector)); // можно или так через pipe "async" в html
    this.isSubmitting$.subscribe((data) => {
      this.isSubmitDisabled = data; // или вот так напрямую переменную, но тогда нужно отписываться потом
    });
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }
  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(loginAction({ request }));
  }
}
