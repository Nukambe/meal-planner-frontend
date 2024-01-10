import { createAction, props } from '@ngrx/store';
import { MealPlan } from 'meal-planner-types';

export const getPlan = createAction('[Plans] Get All Plans');
export const getPlanSuccess = createAction(
  '[Plans] Get All Plans Success',
  props<{ plan: MealPlan }>()
);
export const getPlanFailure = createAction(
  '[Plans] Get All Plans Failure',
  props<{ error: any }>()
);

export const modifyPlan = createAction(
  '[Plans] Modify Plan',
  props<{ plan: MealPlan }>()
);
export const modifyPlanSuccess = createAction(
  '[Plans] Modify Plan Success',
  props<{ plan: MealPlan }>()
);
export const modifyPlanFailure = createAction(
  '[Plans] Modify Plan Failure',
  props<{ error: any }>()
);
