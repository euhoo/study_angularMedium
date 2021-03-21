import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
import {
  updateArticleAction,
  updateArticleFailAction,
  updateArticleSuccessAction,
} from './actions/editArticle';
import {
  getArticleAction,
  getArticleSuccessAction,
} from './actions/getArticle';

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

const editArticleReducer = createReducer(
  initialState,
  on(updateArticleAction, (state) => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
  })),
  on(updateArticleSuccessAction, (state) => ({
    ...state,
    isSubmitting: false,
  })),
  on(updateArticleFailAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  })),

  on(getArticleAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getArticleSuccessAction, (state, { article }) => ({
    ...state,
    isLoading: false,
    article,
  })),
  on(getArticleAction, (state) => ({
    ...state,
    isLoading: false,
  }))
  // on(routerNavigationAction, () => initialState)
);

export function reducers(
  state: EditArticleStateInterface,
  action: Action
): EditArticleStateInterface {
  return editArticleReducer(state, action);
}
