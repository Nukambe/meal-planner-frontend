import { createAction, props } from '@ngrx/store';
import { Meal } from 'meal-planner-types';

export const getAllMeals = createAction(
  '[Meals] Get All Meals',
  props<{ title: string; filters: any; page: number }>()
);
export const getAllMealsSuccess = createAction(
  '[Meals] Get All Meals Success',
  props<{ meals: Meal[] }>()
);
export const getAllMealsFailure = createAction(
  '[Meals] Get All Meals Failure',
  props<{ error: any }>()
);

export const getDbMeals = createAction('[Meals] Get DB Meals');
export const getDbMealsSuccess = createAction(
  '[Meals] Get DB Meals Success',
  props<{ meals: Meal[] }>()
);
export const getDbMealsFailure = createAction(
  '[Meals] Get DB Meals Failure',
  props<{ error: any }>()
);
