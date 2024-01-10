import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map as rxjsMap, catchError, EMPTY } from 'rxjs';
import * as PlanActions from './plans.actions';
import { Injectable } from '@angular/core';
import { PlansService } from './plans.service';
import { MealPlan } from 'meal-planner-types';

@Injectable()
export class PlansEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly plansService: PlansService
  ) {}

  getPlan = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.getPlan),
      mergeMap(() =>
        this.plansService.getPlan().pipe(
          rxjsMap((plannedMeals) => new MealPlan(plannedMeals)),
          rxjsMap((plan: MealPlan) => PlanActions.getPlanSuccess({ plan })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  modifyPlan = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.modifyPlan),
      mergeMap((action) =>
        this.plansService
          .modifyPlan(action.plan)
          .pipe(
            rxjsMap((plan: MealPlan) => PlanActions.modifyPlanSuccess({ plan }))
          )
      ),
      catchError(() => EMPTY)
    )
  );
}
