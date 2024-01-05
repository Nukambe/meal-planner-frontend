import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, EMPTY } from 'rxjs';
import * as CategoriesActions from './categories.actions';
import { Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly categoriesService: CategoriesService
  ) {}

  getAllCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getAllCategories),
      mergeMap(() =>
        this.categoriesService.getAllCategories().pipe(
          map((categories) =>
            CategoriesActions.getAllCategoriesSuccess({ categories })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
