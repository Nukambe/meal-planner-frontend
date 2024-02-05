import { createReducer, on } from '@ngrx/store';
import * as templatesActions from './templates.actions';
import { MealTemplate } from 'meal-planner-types';
// import { sampleMeals } from '../meals/meals.reducer';

export interface TemplatesState {
  templates: MealTemplate[];
}

export const initialState: TemplatesState = {
  templates: [],
};

export const templatesReducer = createReducer(
  initialState,
  on(templatesActions.getTemplatesSuccess, (state, { templates }) => {
    return { ...state, templates };
  }),
  on(templatesActions.modifyTemplateFailure, (state, { error }) => {
    console.error('Error: ', error);
    return state;
  }),
  on(templatesActions.modifyTemplateSuccess, (state, { templates }) => {
    return { ...state, templates };
  }),
  on(templatesActions.getTemplatesFailure, (state, { error }) => {
    console.error('Error: ', error);
    return state;
  })
);
