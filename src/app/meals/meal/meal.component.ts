import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meal } from 'meal-planner-types';
import { FilterService, Filters } from '../../filter.service';
import { MealPlanService } from '../../meal-plan.service';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css',
})
export class MealComponent {
  @Input() meal: Meal | undefined;

  constructor(
    private readonly filterService: FilterService,
    private readonly mealPlanService: MealPlanService
  ) {}

  getActiveFilters() {
    return Object.entries(this.filterService.getAppliedFilters()).reduce(
      (acc, [key, { value }]) => {
        if (value > 0) acc[key as keyof Filters] = value;
        return acc;
      },
      {} as Filters
    );
  }

  getNutrientValue(nutrient: string) {
    if (nutrient === 'Carbs') nutrient = 'Carbohydrates';
    return this.meal?.nutrients.find((n) => n.name === nutrient)?.amount;
  }

  showCardBody() {
    return Object.keys(this.getActiveFilters()).length > 0;
  }

  showAddMealModal(mealId: number) {
    this.mealPlanService.setModalMealId(mealId);
  }
}
