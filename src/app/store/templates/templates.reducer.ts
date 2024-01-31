import { createReducer, on } from '@ngrx/store';
import * as TemplatesActions from './templates.actions';
import { MealTemplate } from 'meal-planner-types';
import { sampleMeals } from '../meals/meals.reducer';

export interface TemplatesState {
  templates: MealTemplate[];
}

const sampleTemplate = {
  title: 'Template 1',
  meals: {
    0: [sampleMeals[0].id, sampleMeals[1].id],
    1: [],
    2: [sampleMeals[0].id, sampleMeals[1].id],
    3: [],
    4: [sampleMeals[1].id, sampleMeals[1].id],
    5: [],
    6: [sampleMeals[0].id, sampleMeals[0].id],
  },
  goals: {
    0: {
      week: '0/0/00',
      day: 0,
      calories: { min: 100, max: 1000 },
      carbs: { min: 100, max: 1000 },
      fat: { min: 100, max: 1000 },
      protein: { min: 100, max: 1000 },
    },
    1: {
      week: '0/0/00',
      day: 1,
      calories: { min: 100, max: 1000 },
      carbs: { min: 100, max: 1000 },
      fat: { min: 100, max: 1000 },
      protein: { min: 100, max: 1000 },
    },
    2: {
      week: '0/0/00',
      day: 2,
      calories: { min: 100, max: 1000 },
      carbs: { min: 100, max: 1000 },
      fat: { min: 100, max: 1000 },
      protein: { min: 100, max: 1000 },
    },
    3: {
      week: '0/0/00',
      day: 3,
      calories: { min: 100, max: 1000 },
      carbs: { min: 100, max: 1000 },
      fat: { min: 100, max: 1000 },
      protein: { min: 100, max: 1000 },
    },
    4: {
      week: '0/0/00',
      day: 4,
      calories: { min: 0, max: 0 },
      carbs: { min: 0, max: 0 },
      fat: { min: 0, max: 0 },
      protein: { min: 0, max: 0 },
    },
    5: {
      week: '0/0/00',
      day: 5,
      calories: { min: 100, max: 1000 },
      carbs: { min: 100, max: 1000 },
      fat: { min: 100, max: 1000 },
      protein: { min: 100, max: 1000 },
    },
    6: {
      week: '0/0/00',
      day: 6,
      calories: { min: 100, max: 1000 },
      carbs: { min: 100, max: 1000 },
      fat: { min: 100, max: 1000 },
      protein: { min: 100, max: 1000 },
    },
  },
};

export const sampleTemplates: MealTemplate[] = [
  sampleTemplate,
  { ...sampleTemplate, title: 'Template 2' },
  { ...sampleTemplate, title: 'Template 3' },
];

export const initialState: TemplatesState = {
  templates: sampleTemplates,
};

export const templatesReducer = createReducer(
  initialState,
  on(TemplatesActions.getTemplatesSuccess, (state, { templates }) => {
    return { ...state, templates };
  }),
  on(TemplatesActions.modifyTemplateSuccess, (state, { templates }) => {
    return { ...state, templates };
  })
);
