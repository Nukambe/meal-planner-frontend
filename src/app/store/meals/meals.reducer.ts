import { createReducer, on } from '@ngrx/store';
import * as MealsActions from './meals.actions';
import { Meal } from 'meal-planner-types';

export interface MealsState {
  meals: Meal[];
}

export const initialState: MealsState = { meals: [] };

export const mealsReducer = createReducer(
  initialState,
  on(MealsActions.getAllMealsSuccess, (state, { meals }) => {
    return { ...state, meals };
  })
);
