import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, EMPTY } from 'rxjs';
import * as MealActions from './meals.actions';
import { Injectable } from '@angular/core';
import { MealsService } from './meals.service';

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
          map((meals) => MealActions.getAllMealsSuccess({ meals })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
