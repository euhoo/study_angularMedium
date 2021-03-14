import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';

@Component({
  selector: 'mc-register', // mc - префикс для того, чтобы понимать, что это наш,а не сторонний компонент
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.initForm();
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
