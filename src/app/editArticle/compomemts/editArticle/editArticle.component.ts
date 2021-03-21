import { Component, OnInit } from '@angular/core';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
} from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';
import { getArticleAction } from '../../store/actions/getArticle';
import { validationErrorsSelector } from '../../../auth/store/selectors';
import { filter, map } from 'rxjs/operators';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { updateArticleAction } from '../../store/actions/editArticle';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.scss'],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ articleInput, slug: this.slug }));
  }
  ngOnInit(): void {
    this.initValues();
    this.fetchData();
  }
  initValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => ({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }))
    );
  }
  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }
}
