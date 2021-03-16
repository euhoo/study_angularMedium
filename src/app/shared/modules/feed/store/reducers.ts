import { FeedStateInterface } from '../types/feedState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from './actions/getFeed';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedReducer = createReducer(
  initialState,
  on(getFeedAction, (state) => ({ ...state, isLoading: true })),
  on(getFeedSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.feed,
  })),
  on(getFeedFailureAction, (state) => ({ ...state, isLoading: false }))
);

export function reducers(
  state: FeedStateInterface,
  action: Action
): FeedStateInterface {
  return feedReducer(state, action);
}
