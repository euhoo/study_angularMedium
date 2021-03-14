import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../../store/selectors';

@Component({
  selector: 'mc-register', // mc - префикс для того, чтобы понимать, что это наш,а не сторонний компонент
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  isSubmitDisabled: boolean;

  constructor(private fb: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }
  initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector)); // можно или так через pipe "async" в html
    this.isSubmitting$.subscribe((data) => {
      this.isSubmitDisabled = data; // или вот так напрямую переменную
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: '',
    });
  }
  onSubmit(): void {
    this.store.dispatch(registerAction(this.form.value));
    console.log(this.store);
  }
}
