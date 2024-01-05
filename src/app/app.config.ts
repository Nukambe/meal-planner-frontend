import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

import { mealsReducer } from './store/meals/meals.reducer';
import { MealsEffects } from './store/meals/meals.effects';

import { categoriesReducer } from './store/categories/categories.reducer';
import { CategoriesEffects } from './store/categories/categories.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ meals: mealsReducer, categories: categoriesReducer }),
    provideEffects([MealsEffects, CategoriesEffects]),
  ],
};
