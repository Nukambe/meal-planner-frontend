import { Injectable } from '@angular/core';

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

  constructor() {}

  setAppliedFilters(filters: Filters) {
    const sameFilter = Object.entries(filters).every(
      ([key, value]) =>
        this.appliedFilters[key as keyof Filters].value === value.value &&
        this.appliedFilters[key as keyof Filters].order === value.order
    );
    if (sameFilter) return;

    this.appliedFilters = filters;
  }

  setTitleFilter(title: string) {
    if (this.titleFilter === title) return;
    this.titleFilter = title;
  }

  getAppliedFilters() {
    return this.appliedFilters;
  }

  getTitleFilter() {
    return this.titleFilter;
  }
}
