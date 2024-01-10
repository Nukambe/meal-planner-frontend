import { createReducer, on } from '@ngrx/store';
import * as PlansActions from './plans.actions';
import { MealPlan } from 'meal-planner-types';
import { sampleMeals } from '../meals/meals.reducer';

export interface PlansState {
  plan: MealPlan;
}

export const initialState: PlansState = {
  plan: new MealPlan(
    sampleMeals.map((meal) => ({ week: '1/7/24', day: 3, id: meal.id }))
  ),
};

export const plansReducer = createReducer(
  initialState,
  on(PlansActions.getPlanSuccess, (state, { plan }) => {
    return { ...state, plan };
  }),
  on(PlansActions.modifyPlanSuccess, (state, { plan }) => {
    return { ...state, plan };
  })
);
