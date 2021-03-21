import { ArticleStateInterface } from '../types/articleState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from './actions/getArticle';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const articleReducer = createReducer(
  initialState,
  on(getArticleAction, (state) => ({ ...state, isLoading: true })),
  on(getArticleSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.article,
  })),
  on(getArticleFailureAction, (state) => ({ ...state, isLoading: false })),
  on(routerNavigationAction, () => initialState)
);

export function reducers(
  state: ArticleStateInterface,
  action: Action
): ArticleStateInterface {
  return articleReducer(state, action);
}
