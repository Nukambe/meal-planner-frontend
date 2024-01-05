import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MealsComponent } from './meals/meals.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '' },
  { path: 'meal-planner', redirectTo: '' },
  { path: 'meals', component: MealsComponent },
  { path: 'meals/:mealId', component: MealDetailComponent },
  { path: '**', redirectTo: '' },
];
