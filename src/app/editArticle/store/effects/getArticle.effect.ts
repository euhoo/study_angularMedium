import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedArticleService } from '../../../shared/services/article.service';
import {
  getArticleAction,
  getArticleFailAction,
  getArticleSuccessAction,
} from '../actions/getArticle';

@Injectable()
export class GetArticleEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) =>
        this.sharedArticleService.getArticle(slug).pipe(
          map((article) => {
            return getArticleSuccessAction({ article });
          }),
          catchError(() => of(getArticleFailAction()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {}
}
