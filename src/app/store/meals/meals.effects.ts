import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map as rxjsMap, catchError, EMPTY } from 'rxjs';
import * as MealActions from './meals.actions';
import { Injectable } from '@angular/core';
import { MealsService } from './meals.service';
import { Meal } from 'meal-planner-types';

@Injectable()
export class MealsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly mealsService: MealsService
  ) {}

  getAllMeals = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.getAllMeals),
      mergeMap((action) =>
        this.mealsService
          .getAllMeals(action.title, action.filters, action.page)
          .pipe(
            rxjsMap((meals: Meal[]) =>
              MealActions.getAllMealsSuccess({ meals })
            ),
            catchError(() => EMPTY)
          )
      )
    )
  );

  getDbMeals = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.getDbMeals),
      mergeMap(() =>
        this.mealsService.getDbMeals().pipe(
          rxjsMap((meals: Meal[]) => {
            return meals;
          }),
          rxjsMap((meals: Meal[]) => MealActions.getDbMealsSuccess({ meals })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
