import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { EditArticleStateInterface } from '../types/editArticleState.interface';

export const editArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  EditArticleStateInterface
>('editArticle');

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (state) => state.isSubmitting
);
export const validationErrorSelector = createSelector(
  editArticleFeatureSelector,
  (state) => state.validationErrors
);
export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (state) => state.article
);
export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (state) => state.isLoading
);
