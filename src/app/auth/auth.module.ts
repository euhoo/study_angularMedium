import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { reducers } from './store/reducers';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [{ path: 'register', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // регистрация маршрутов в этом модуле
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers), // подключение редьюсеров с именем поля(auth) объекта
  ],
  declarations: [RegisterComponent],
  providers: [AuthService],
})
export class AuthModule {}
