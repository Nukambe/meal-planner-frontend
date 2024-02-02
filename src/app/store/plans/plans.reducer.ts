import { createReducer, on } from '@ngrx/store';
import * as PlansActions from './plans.actions';
import { MealPlan } from 'meal-planner-types';
// import { sampleMeals } from '../meals/meals.reducer';
import { plannedGoal } from 'meal-planner-types';

export interface PlansState {
  plan: MealPlan;
}

const sampleGoals: plannedGoal[] = [
  {
    week: '1/7/24',
    day: 0,
    calories: { min: 100, max: 1000 },
    carbs: { min: 100, max: 1000 },
    fat: { min: 100, max: 1000 },
    protein: { min: 100, max: 1000 },
  },
  {
    week: '1/7/24',
    day: 1,
    calories: { min: 100, max: 1000 },
    carbs: { min: 100, max: 1000 },
    fat: { min: 100, max: 1000 },
    protein: { min: 100, max: 1000 },
  },
  {
    week: '1/7/24',
    day: 3,
    calories: { min: 100, max: 1000 },
    carbs: { min: 100, max: 1000 },
    fat: { min: 100, max: 1000 },
    protein: { min: 100, max: 1000 },
  },
];

export const initialState: PlansState = {
  plan: new MealPlan(
    [].map((meal) => ({ week: '1/7/24', day: 3, id: meal })),
    sampleGoals
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
