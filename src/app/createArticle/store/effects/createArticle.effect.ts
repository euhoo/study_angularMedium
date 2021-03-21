import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  createArticleAction,
  createArticleFailAction,
  createArticleSuccessAction,
} from '../actions/createArticle';
import { CreateArticleService } from '../../services/createArticle.service';

@Injectable()
export class CreateArticleEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) =>
        this.createArticleService.createArticle(articleInput).pipe(
          map((article) => {
            return createArticleSuccessAction({ article });
          }),
          catchError((errResponse: HttpErrorResponse) =>
            of(createArticleFailAction({ errors: errResponse.error.errors }))
          )
        )
      )
    )
  );
  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
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
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
