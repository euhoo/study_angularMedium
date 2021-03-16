import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { FeedService } from '../../services/feed.service';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/getFeed';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      // подписка на поток всех actions в приложении
      ofType(getFeedAction), // оставляем только типа registerAction
      switchMap(({ url }) => {
        // запускаем новый стрим
        return this.feedService.getFeed(url).pipe(
          // подписка на новый стрим, который вернет функция authService.register
          map(
            (feed: GetFeedResponseInterface) => getFeedSuccessAction({ feed }) // если все хорошо - диспатчить success action
          ),
          // если упали - диспатчить failure action
          catchError(() => of(getFeedFailureAction()))
        );
      })
    )
  );

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
