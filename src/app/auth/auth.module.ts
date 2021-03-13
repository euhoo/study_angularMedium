import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from 'src/app/auth/components/register/register.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // регистрация маршрутов в этом модуле
    ReactiveFormsModule,
  ],
  declarations: [RegisterComponent],
})
export class AuthModule {}
