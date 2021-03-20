import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../../types/appState.interface';
import { FeedStateInterface } from '../types/feedState.interface';

export const feedFeatureSelector = createFeatureSelector<
  AppStateInterface,
  FeedStateInterface
>('feed');

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (state) => state.isLoading
);
export const errorSelector = createSelector(
  feedFeatureSelector,
  (state) => state.error
);
export const feedSelector = createSelector(
  feedFeatureSelector,
  (state) => state.data
);
