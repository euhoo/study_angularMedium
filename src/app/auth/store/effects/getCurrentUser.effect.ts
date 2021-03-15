import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import { PersistanceService } from '../../../shared/services/persistance.service';

import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';

@Injectable()
export class CurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      // подписка на поток всех actions в приложении
      ofType(getCurrentUserAction), // оставляем только типа registerAction
      switchMap(() => {
        const token = this.persistanceService.get('accessToken');
        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        // запускаем новый стрим
        return this.authService.getCurrentUser().pipe(
          // подписка на новый стрим, который вернет функция authService.register
          map(
            (currentUser: CurrentUserInterface) =>
              getCurrentUserSuccessAction({ currentUser }) // если все хорошо - диспатчить success action
          ),
          // если упали - диспатчить failure action
          catchError(() => of(getCurrentUserFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}
}
