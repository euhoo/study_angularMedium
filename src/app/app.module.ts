import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
import { PersistanceService } from './shared/services/persistance.service';
import { AuthinterceptorService } from './shared/services/authinterceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({}), // регистрация ngrx store и редьюсеров (аргументы функции)
    EffectsModule.forRoot([]), // регистрация ngrx effects (аргументы функции)
    /* регистрация redux dev tools */
    StoreDevtoolsModule.instrument({
      maxAge: 25, // количество action, который хотим видеть
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    TopBarModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    PersistanceService,
    // расширенная запись, чтобы указать multi: true
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true,
    },
  ],
})
export class AppModule {}
