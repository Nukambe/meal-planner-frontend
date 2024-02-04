import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

import { mealsReducer } from './store/meals/meals.reducer';
import { MealsEffects } from './store/meals/meals.effects';

import { plansReducer } from './store/plans/plans.reducer';
import { PlansEffects } from './store/plans/plans.effects';

import { templatesReducer } from './store/templates/templates.reducer';
import { TemplatesEffects } from './store/templates/templates.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      meals: mealsReducer,

      plan: plansReducer,
      templates: templatesReducer,
    }),
    provideEffects([MealsEffects, PlansEffects, TemplatesEffects]),
  ],
};
