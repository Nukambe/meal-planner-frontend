import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MealsActions from './store/meals/meals.actions';

export interface Filters {
  Calories: { value: number; order: boolean };
  Carbs: { value: number; order: boolean };
  Fat: { value: number; order: boolean };
  Protein: { value: number; order: boolean };
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private appliedFilters: Filters = {
    Calories: { value: 0, order: true },
    Carbs: { value: 0, order: true },
    Fat: { value: 0, order: true },
    Protein: { value: 0, order: true },
  };
  private titleFilter = '';
  private page = 0;

  constructor(private readonly store: Store) {}

  setAppliedFilters(filters: Filters) {
    const sameFilter = Object.entries(filters).every(([key, value]) => {
      return (
        this.appliedFilters[key as keyof Filters].value === value.value &&
        this.appliedFilters[key as keyof Filters].order === value.order
      );
    });
    if (sameFilter) return;

    this.page = 0;
    this.appliedFilters = filters;
    this.store.dispatch(
      MealsActions.getAllMeals({
        title: this.titleFilter,
        filters: this.appliedFilters,
        page: this.page,
      })
    );
  }

  setTitleFilter(title: string) {
    if (this.titleFilter === title) return;
    this.titleFilter = title;
    this.store.dispatch(
      MealsActions.getAllMeals({
        title: this.titleFilter,
        filters: this.appliedFilters,
        page: this.page,
      })
    );
  }

  initialDispatch() {
    this.store.dispatch(
      MealsActions.getAllMeals({
        title: this.titleFilter,
        filters: this.appliedFilters,
        page: this.page,
      })
    );
  }

  getAppliedFilters() {
    return this.appliedFilters;
  }

  getTitleFilter() {
    return this.titleFilter;
  }

  getPage() {
    return this.page;
  }

  setPage(page: number) {
    this.page = page;
    this.store.dispatch(
      MealsActions.getAllMeals({
        title: this.titleFilter,
        filters: this.appliedFilters,
        page: this.page,
      })
    );
  }
}
