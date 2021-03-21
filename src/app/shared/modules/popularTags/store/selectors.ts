import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../../types/appState.interface';
import { PopularTagsStateInterface } from '../types/popularTagsState.interface';

export const popularTagsFeatureSelector = createFeatureSelector<
  AppStateInterface,
  PopularTagsStateInterface
>('popularTags');

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (state) => state.isLoading
);
export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (state) => state.error
);
export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (state) => state.data
);
