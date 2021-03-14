import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';
import {
  loginAction,
  loginFailureAction,
  loginSuccesAction,
} from '../actions/login.action';

@Injectable()
export class LoginEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      // подписка на поток всех actions в приложении
      ofType(loginAction), // оставляем только типа registerAction
      switchMap(({ request }) =>
        // запускаем новый стрим
        this.authService.login(request).pipe(
          // подписка на новый стрим, который вернет функция authService.register
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return loginSuccesAction({ currentUser }); // если все хорошо - диспатчить success action
          }),
          // если упали - диспатчить failure action
          catchError((errResponse: HttpErrorResponse) =>
            of(loginFailureAction({ errors: errResponse.error.errors }))
          )
        )
      )
    )
  );
  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccesAction),
        tap(() => {
          this.router.navigateByUrl('/'); // редирект при успешной регистрации
        })
      ),
    /* Каждый createEffect внутри должен диспатчить какой-то action.
     Если диспатчить не нужно(например как тут), нужно указать что не будет dispatch */
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
