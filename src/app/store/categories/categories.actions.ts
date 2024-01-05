import { createAction, props } from '@ngrx/store';

export const getAllCategories = createAction('[Categories] Get All Categories');
export const getAllCategoriesSuccess = createAction(
  '[Categories] Get All Categories Success',
  props<{ categories: any }>()
);
export const getAllCategoriesFailure = createAction(
  '[Categories] Get All Categories Failure',
  props<{ error: any }>()
);
