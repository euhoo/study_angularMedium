import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ArticleService as SharedArticleService } from '../../../shared/services/article.service';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/getArticle';
import { ArticleInterface } from '../../../shared/types/article.interface';

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      // подписка на поток всех actions в приложении
      ofType(getArticleAction), // оставляем только типа registerAction
      switchMap(({ slug }) => {
        // запускаем новый стрим
        return this.sharedArticleService.getArticle(slug).pipe(
          // подписка на новый стрим, который вернет функция authService.register
          map(
            (article: ArticleInterface) => getArticleSuccessAction({ article }) // если все хорошо - диспатчить success action
          ),
          // если упали - диспатчить failure action
          catchError(() => of(getArticleFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {}
}
