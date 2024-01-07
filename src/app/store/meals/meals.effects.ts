import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map as rxjsMap, catchError, EMPTY } from 'rxjs';
import * as MealActions from './meals.actions';
import { Injectable } from '@angular/core';
import { MealsService } from './meals.service';
import { Meal, Nutrition, Recipe } from 'meal-planner-types';

@Injectable()
export class MealsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly mealsService: MealsService
  ) {}

  getAllMeals = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.getAllMeals),
      mergeMap(() =>
        this.mealsService.getAllMeals().pipe(
          rxjsMap((meals) =>
            meals.map(
              (meal: Meal) =>
                new Meal(
                  meal.id,
                  meal.name,
                  meal.description,
                  meal.recipe,
                  new Nutrition([...Object.values(meal.nutrition)]),
                  meal.cookTime,
                  meal.category,
                  meal.cuisine,
                  meal.tags,
                  meal.image
                )
            )
          ),
          rxjsMap((meals) => MealActions.getAllMealsSuccess({ meals })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
