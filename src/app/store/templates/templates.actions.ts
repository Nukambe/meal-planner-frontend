import { createAction, props } from '@ngrx/store';
import { MealTemplate } from 'meal-planner-types';

export const getTemplates = createAction('[Templates] Get All Templates');
export const getTemplatesSuccess = createAction(
  '[Templates] Get All Templates Success',
  props<{ templates: MealTemplate[] }>()
);
export const getTemplatesFailure = createAction(
  '[Templates] Get All Templates Failure',
  props<{ error: any }>()
);

export const modifyTemplate = createAction(
  '[Templates] Modify Template',
  props<{ templates: MealTemplate[] }>()
);
export const modifyTemplateSuccess = createAction(
  '[Templates] Modify Template Success',
  props<{ templates: MealTemplate[] }>()
);
export const modifyTemplateFailure = createAction(
  '[Templates] Modify Template Failure',
  props<{ error: any }>()
);
