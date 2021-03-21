import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  updateArticleAction, updateArticleFailAction,
  updateArticleSuccessAction,
} from '../actions/editArticle';
import { EditArticleService } from '../../services/editArticle.service';

@Injectable()
export class UpdateArticleEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ articleInput, slug }) =>
        this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article) => {
            return updateArticleSuccessAction({ article });
          }),
          catchError((errResponse: HttpErrorResponse) =>
            of(updateArticleFailAction({ errors: errResponse.error.errors }))
          )
        )
      )
    )
  );
  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['articles', article.slug]); // редирект при успешной регистрации
        })
      ),
    /* Каждый createEffect внутри должен диспатчить какой-то action.
     Если диспатчить не нужно(например как тут), нужно указать что не будет dispatch */
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}
}
