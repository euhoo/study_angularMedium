import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getArticleAction } from '../../store/actions/getArticle';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ArticleInterface } from '../../../shared/types/article.interface';

import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors';
import { map } from 'rxjs/operators';
import { currentUserSelector } from '../../../auth/store/selectors';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: ArticleInterface | null;
  sub: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  initValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
      map(([article, currentUser]) => {
        if (!article || !currentUser) {
          return false;
        }
        return article?.author.username === currentUser?.username;
      })
    );
  }
  initListeners(): void {
    this.sub = this.store.pipe(select(articleSelector)).subscribe((article) => {
      this.article = article;
    });
  }
  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }
  ngOnInit(): void {
    this.initValues();
    this.initListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
