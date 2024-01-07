import { createAction, props } from '@ngrx/store';
import { Meal } from 'meal-planner-types';

export const getAllMeals = createAction('[Meals] Get All Meals');
export const getAllMealsSuccess = createAction(
  '[Meals] Get All Meals Success',
  props<{ meals: Meal[] }>()
);
export const getAllMealsFailure = createAction(
  '[Meals] Get All Meals Failure',
  props<{ error: any }>()
);
