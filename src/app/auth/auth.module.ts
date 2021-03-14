import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { environment } from '../../environments/environment';

const routes: Routes = [{ path: 'register', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // регистрация маршрутов в этом модуле
    ReactiveFormsModule,
    StoreModule.forRoot({}), // регистрация ngrx store и редьюсеров (аргументы функции)
    /* регистрация redux dev tools */
    StoreDevtoolsModule.instrument({
      maxAge: 25, // количество action, который хотим видеть
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  declarations: [RegisterComponent],
})
export class AuthModule {}
