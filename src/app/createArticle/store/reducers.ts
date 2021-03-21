import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { CreateArticleStateInterface } from '../types/createArticleState.interface';
import {
  createArticleAction,
  createArticleSuccessAction,
  createArticleFailAction,
} from './actions/createArticle';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleReducer = createReducer(
  initialState,
  on(createArticleAction, (state) => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
  })),
  on(createArticleSuccessAction, (state) => ({
    ...state,
    isSubmitting: false,
  })),
  on(createArticleFailAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  })),

  on(routerNavigationAction, () => initialState)
);

export function reducers(
  state: CreateArticleStateInterface,
  action: Action
): CreateArticleStateInterface {
  return createArticleReducer(state, action);
}
