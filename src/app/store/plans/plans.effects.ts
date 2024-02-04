import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map as rxjsMap, catchError, EMPTY, repeat } from 'rxjs';
import * as PlanActions from './plans.actions';
import { Injectable } from '@angular/core';
import { PlansService } from './plans.service';
import {
  MealPlan,
  dayOfWeek,
  plannedGoal,
  plannedGoals,
  plannedMeal,
  plannedMeals,
} from 'meal-planner-types';

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
          rxjsMap(({ plannedMeals, plannedGoals }) => {
            return this.convertPlan(plannedMeals, plannedGoals);
          }),
          rxjsMap((plan: MealPlan) => PlanActions.getPlanSuccess({ plan })),
          catchError((error) => {
            PlanActions.getPlanFailure({ error });
            return EMPTY;
          })
        )
      )
    )
  );

  modifyPlan = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.modifyPlan),
      mergeMap((action) =>
        this.plansService.modifyPlan(action.plan).pipe(
          rxjsMap(({ plannedMeals, plannedGoals }) => {
            return this.convertPlan(plannedMeals, plannedGoals);
          }),
          rxjsMap((plan: MealPlan) => PlanActions.modifyPlanSuccess({ plan }))
        )
      ),
      catchError((error) => {
        PlanActions.modifyPlanFailure({ error });
        return EMPTY;
      }),
      repeat() // Effect stops after 1st trigger? so we need to repeat it
      // https://stackoverflow.com/questions/62034865/ngrx-effect-ones-failure-occurs-does-not-accept-new-actions
    )
  );

  convertPlan = (plannedMeals: any, plannedGoals: any) => {
    const meals: plannedMeal[] = Object.entries(plannedMeals).reduce(
      (acc, [week, days]) => {
        Object.entries(days as dayOfWeek).forEach(([day, mealIds]) => {
          mealIds.forEach((id: number) => {
            acc.push({ week, day: +day, id });
          });
        });
        return acc;
      },
      [] as plannedMeal[]
    );

    const goals: plannedGoal[] = Object.entries(plannedGoals).reduce(
      (acc, [week, days]) => {
        Object.entries(days as dayOfWeek).forEach(([day, goal]) => {
          acc.push({ week, day: +day, ...goal });
        });
        return acc;
      },
      [] as plannedGoal[]
    );

    return new MealPlan(meals, goals);
  };
}
