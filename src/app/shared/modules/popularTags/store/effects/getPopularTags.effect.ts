import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PopularTagsService } from '../../services/popularTags.service';
import {
  getPopularTagsAction,
  getPopularTagsFailAction,
  getPopularTagsSuccessAction,
} from '../actions/getPopularTags';
import { PopularTagType } from '../../../../types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      // подписка на поток всех actions в приложении
      ofType(getPopularTagsAction), // оставляем только типа registerAction
      switchMap(() => {
        // запускаем новый стрим
        return this.popularTagsService.getPopularTags().pipe(
          // подписка на новый стрим, который вернет функция authService.register
          map(
            (popularTags: PopularTagType[]) =>
              getPopularTagsSuccessAction({ popularTags }) // если все хорошо - диспатчить success action
          ),
          // если упали - диспатчить failure action
          catchError(() => of(getPopularTagsFailAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
