import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleStateInterface } from '../types/articleState.interface';
import { AppStateInterface } from '../../shared/types/appState.interface';

export const articleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  ArticleStateInterface
>('article');

export const isLoadingSelector = createSelector(
  articleFeatureSelector,
  (state) => state.isLoading
);
export const errorSelector = createSelector(
  articleFeatureSelector,
  (state) => state.error
);
export const articleSelector = createSelector(
  articleFeatureSelector,
  (state) => state.data
);
