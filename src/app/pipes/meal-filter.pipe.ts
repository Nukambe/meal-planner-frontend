import { Pipe, PipeTransform } from '@angular/core';
import { FilterService } from '../filter.service';
import { Meal } from 'meal-planner-types';

@Pipe({
  name: 'mealFilter',
  standalone: true,
})
export class MealFilterPipe implements PipeTransform {
  constructor(private filterService: FilterService) {}

  transform(value: Meal[] | null, ...args: unknown[]): Meal[] {
    if (!value) return [];

    const title = this.filterService.getTitleFilter();
    const filters = this.filterService.getAppliedFilters();

    if (title) {
      value = value.filter((meal: Meal) =>
        meal.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    if (filters.Calories.value) {
      value = value.filter((meal: Meal) =>
        this.filterByNutrient(meal, {
          name: 'Calories',
          value: filters.Calories.value,
          order: filters.Calories.order,
        })
      );
    }
    if (filters.Carbs.value) {
      value = value.filter((meal: Meal) =>
        this.filterByNutrient(meal, {
          name: 'Carbohydrates',
          value: filters.Carbs.value,
          order: filters.Carbs.order,
        })
      );
    }
    if (filters.Protein.value) {
      value = value.filter((meal: Meal) =>
        this.filterByNutrient(meal, {
          name: 'Protein',
          value: filters.Protein.value,
          order: filters.Protein.order,
        })
      );
    }
    if (filters.Fat.value) {
      value = value.filter((meal: Meal) =>
        this.filterByNutrient(meal, {
          name: 'Fat',
          value: filters.Fat.value,
          order: filters.Fat.order,
        })
      );
    }
    return value;
  }

  filterByNutrient(
    meal: Meal,
    filter: { name: string; value: number; order: boolean }
  ) {
    const nutrient = meal.nutrients.find(
      (nutrient) => nutrient.name === filter.name
    );
    if (!nutrient) return false;
    if (filter.order) return nutrient.amount >= filter.value;
    return nutrient.amount <= filter.value;
  }
}
