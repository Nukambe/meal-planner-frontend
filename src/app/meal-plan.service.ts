import { Injectable } from '@angular/core';
import { Meal, MealPlan, plannedGoal } from 'meal-planner-types';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom, switchMap, take } from 'rxjs';
import { dayOfWeek } from 'meal-planner-types';
import * as MealPlanActions from './store/plans/plans.actions';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  private modalMealId: number = 0;
  private modalDay: dayOfWeek = dayOfWeek.Sunday;
  private activeWeek: string = '1/7/24';

  constructor(private readonly store: Store<any>) {}
  // Active Week --------------------------------------------------------------
  getActiveWeek(): string {
    return this.activeWeek;
  }

  setActiveWeek(week: string) {
    this.activeWeek = week;
  }
  // Meals -------------------------------------------------------------------
  getAllMeals(): Observable<Meal[]> {
    return this.store.select(
      (state: { meals: { meals: Meal[] } }) => state.meals.meals
    );
  }

  getMealsByIds(mealIds: number[]): Observable<(Meal | undefined)[]> {
    return this.store.select((state: { meals: { meals: Meal[] } }) => {
      const meals = mealIds.map((id) =>
        state.meals.meals.find((m) => m.id === id)
      );
      return meals;
    });
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
    return this.store.select((state: { plan: { plan: MealPlan } }) => {
      const ids = state.plan.plan.getPlannedMealsByDay(week, day);
      // console.log('meal ids by day: ', ids);
      return ids;
    });
  }

  getMealsByWeek(week: string): Observable<(Meal | undefined)[]> {
    return this.getMealIdsByWeek(week).pipe(
      take(1),
      switchMap((ids) => {
        // console.log('get meals by week (ids): ', ids);
        const mealIds = this.getMealsByIds(ids);
        return mealIds;
      })
    );
  }

  getMealsByDay(
    week: string,
    day: dayOfWeek
  ): Observable<(Meal | undefined)[]> {
    return this.getMealIdsByDay(week, day).pipe(
      take(1),
      switchMap((ids) => {
        // console.log('get meals by day (ids): ', ids);
        const mealIds = this.getMealsByIds(ids);
        return mealIds;
      })
    );
  }

  removePlannedMeal(week: string, day: dayOfWeek, index: number) {
    this.getMealPlan()
      .pipe(take(1))
      .subscribe((plan) => {
        const newPlan = new MealPlan(
          plan.getAllPlannedMeals(),
          plan.getAllPlannedGoals()
        );
        newPlan.removePlannedMeal(week, day, index);
        this.store.dispatch(MealPlanActions.modifyPlan({ plan: newPlan }));
      });
  }

  addPlannedMeal(week: string, day: dayOfWeek, mealId: number) {
    this.getMealPlan()
      .pipe(take(1))
      .subscribe((plan) => {
        const newPlan = new MealPlan(
          [...plan.getAllPlannedMeals(), { week, day, id: mealId }],
          plan.getAllPlannedGoals()
        );
        this.store.dispatch(MealPlanActions.modifyPlan({ plan: newPlan }));
      });
  }
  // Macros ------------------------------------------------------------------
  getMacrosByWeek(week: string): Observable<plannedGoal[]> {
    return this.store.select((state: { plan: { plan: MealPlan } }) =>
      state.plan.plan.getPlannedGoalsByWeek(week)
    );
  }

  getMacrosByDay(week: string, day: dayOfWeek) {
    return this.store.select((state: { plan: { plan: MealPlan } }) => {
      const macros = state.plan.plan.getPlannedGoalsByDay(week, day);
      return {
        calories: macros.calories,
        carbs: macros.carbs,
        fat: macros.fat,
        protein: macros.protein,
      };
    });
  }

  addPlannedMacros(macros: plannedGoal) {
    console.log('addPlannedMacros: ', macros);
    this.getMealPlan()
      .pipe(take(1))
      .subscribe((plan) => {
        const newPlan = new MealPlan(plan.getAllPlannedMeals(), [
          ...plan.getAllPlannedGoals(),
          macros,
        ]);
        this.store.dispatch(MealPlanActions.modifyPlan({ plan: newPlan }));
      });
  }

  removePlannedMacros(week: string, day: dayOfWeek) {
    this.getMealPlan()
      .pipe(take(1))
      .subscribe((plan) => {
        const newPlan = new MealPlan(
          plan.getAllPlannedMeals(),
          plan.getAllPlannedGoals()
        );
        newPlan.removePlannedGoal(week, day);
        this.store.dispatch(MealPlanActions.modifyPlan({ plan: newPlan }));
      });
  }
  // Add Meal Modal -----------------------------------------------------------------
  setModalMealId(mealId: number) {
    this.modalMealId = mealId;
  }

  getModalMealId(): number {
    return this.modalMealId;
  }
  // Edit Macros Modal ---------------------------------------------------------------
  setMacroDay(day: dayOfWeek) {
    this.modalDay = day;
  }

  getMacroDay(): dayOfWeek {
    return this.modalDay;
  }
}
