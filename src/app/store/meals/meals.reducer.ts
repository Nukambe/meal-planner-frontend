import { createReducer, on } from '@ngrx/store';
import * as MealsActions from './meals.actions';

export interface MealsState {
  meals: any;
}

export const initialState: MealsState = { meals: [] };

export const mealsReducer = createReducer(
  initialState,
  on(MealsActions.getAllMealsSuccess, (state, { meals }) => {
    return { ...state, meals };
  })
);
