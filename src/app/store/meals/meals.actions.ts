import { createAction, props } from '@ngrx/store';

export const getAllMeals = createAction('[Meals] Get All Meals');
export const getAllMealsSuccess = createAction(
  '[Meals] Get All Meals Success',
  props<{ meals: any }>()
);
export const getAllMealsFailure = createAction(
  '[Meals] Get All Meals Failure',
  props<{ error: any }>()
);
