import { PopularTagsStateInterface } from '../types/popularTagsState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsSuccessAction,
  getPopularTagsFailAction,
} from './actions/getPopularTags';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state) => ({ ...state, isLoading: true })),
  on(getPopularTagsSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.popularTags,
  })),
  on(getPopularTagsFailAction, (state) => ({ ...state, isLoading: false }))
);

export function reducers(
  state: PopularTagsStateInterface,
  action: Action
): PopularTagsStateInterface {
  return popularTagsReducer(state, action);
}
