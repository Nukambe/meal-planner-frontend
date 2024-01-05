import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';

export interface CategoriesState {
  categories: any;
}

export const initialState: CategoriesState = { categories: [] };

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.getAllCategoriesSuccess, (state, { categories }) => {
    console.log('CategoriesActions.getAllCategoriesSuccess');
    return { ...state, categories };
  })
);
