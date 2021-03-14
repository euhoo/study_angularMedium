import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';

@Injectable()
export class RegisterEffect {
  reguster$ = createEffect(() =>
    this.actions$.pipe(
      // подписка на поток всех actions в приложении
      ofType(registerAction), // оставляем только типа registerAction
      switchMap(({ request }) =>
        // запускаем новый стрим
        this.authService.register(request).pipe(
          // подписка на новый стрим, который вернет функция authService.register
          map(
            (currentUser: CurrentUserInterface) =>
              registerSuccessAction({ currentUser }) // если все хорошо - диспатчить success action
          ),
          catchError(() => of(registerFailureAction())) // если упали - диспатчить failure action
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
