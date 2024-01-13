import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map as rxjsMap, catchError, EMPTY } from 'rxjs';
import * as TemplatesActions from './templates.actions';
import { Injectable } from '@angular/core';
import { TemplatesService } from './templates.service';
import { MealTemplate } from 'meal-planner-types';

@Injectable()
export class TemplatesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly templatesService: TemplatesService
  ) {}

  getPlan = createEffect(() =>
    this.actions$.pipe(
      ofType(TemplatesActions.getTemplates),
      mergeMap(() =>
        this.templatesService.getTemplates().pipe(
          rxjsMap((templates: MealTemplate[]) =>
            TemplatesActions.getTemplatesSuccess({ templates })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  modifyPlan = createEffect(() =>
    this.actions$.pipe(
      ofType(TemplatesActions.modifyTemplate),
      mergeMap((action) =>
        this.templatesService
          .modifyTemplates(action.templates)
          .pipe(
            rxjsMap((templates: MealTemplate[]) =>
              TemplatesActions.modifyTemplateSuccess({ templates })
            )
          )
      ),
      catchError(() => EMPTY)
    )
  );
}
