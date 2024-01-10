import { Injectable } from '@angular/core';
import { Meal, MealPlan } from 'meal-planner-types';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { dayOfWeek } from 'meal-planner-types';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  constructor(private readonly store: Store<any>) {}
  // Meals -------------------------------------------------------------------
  getAllMeals(): Observable<Meal[]> {
    return this.store.select(
      (state: { meals: { meals: Meal[] } }) => state.meals.meals
    );
  }

  getMealsByIds(mealIds: number[]): Observable<Meal[]> {
    return this.store.select((state: { meals: { meals: Meal[] } }) =>
      state.meals.meals.filter((meal: Meal) => mealIds.includes(meal.id))
    );
  }
  // Meal Plan ---------------------------------------------------------------
  getMealPlan(): Observable<MealPlan> {
    return this.store.select((state) => state.plan.plan);
  }

  getMealById(id: number): Observable<Meal> {
    return this.store.select((state) =>
      state.meals.meals.find((meal: Meal) => meal.id === id)
    );
  }

  getMealIdsByWeek(week: string): Observable<number[]> {
    return this.store.select((state: { plan: { plan: MealPlan } }) =>
      state.plan.plan.getPlannedMealsByWeek(week)
    );
  }

  getMealIdsByDay(week: string, day: dayOfWeek): Observable<number[]> {
    return this.store.select((state: { plan: { plan: MealPlan } }) =>
      state.plan.plan.getPlannedMealsByDay(week, day)
    );
  }
}
