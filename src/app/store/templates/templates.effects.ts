import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map as rxjsMap, catchError, EMPTY } from 'rxjs';
import * as templatesActions from './templates.actions';
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
      ofType(templatesActions.getTemplates),
      mergeMap(() =>
        this.templatesService.getTemplates().pipe(
          rxjsMap((templates: MealTemplate[]) => {
            return templatesActions.getTemplatesSuccess({ templates });
          }),
          catchError(() => {
            templatesActions.getTemplatesFailure({ error: 'Error' });
            return EMPTY;
          })
        )
      )
    )
  );

  modifyPlan = createEffect(() =>
    this.actions$.pipe(
      ofType(templatesActions.modifyTemplate),
      mergeMap((action) =>
        this.templatesService
          .modifyTemplates(action.templates)
          .pipe(
            rxjsMap((templates: any) =>
              templatesActions.modifyTemplateSuccess({ templates })
            )
          )
      ),
      catchError(() => {
        templatesActions.modifyTemplateFailure({ error: 'Error' });
        return EMPTY;
      })
    )
  );
}
