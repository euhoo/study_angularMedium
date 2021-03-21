import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { CreateArticleStateInterface } from '../types/createArticleState.interface';

export const createArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  CreateArticleStateInterface
>('createArticle');

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (state) => state.isSubmitting
);
export const errorSelector = createSelector(
  createArticleFeatureSelector,
  (state) => state.validationErrors
);
