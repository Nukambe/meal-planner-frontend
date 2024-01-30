import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meal, MealTemplate, dayOfWeek } from 'meal-planner-types';
import { CommonModule } from '@angular/common';
import { TemplatesService } from '../templates.service';
import { MealPlanService } from '../meal-plan.service';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { Observable, Subject, firstValueFrom, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-template-comparison',
  standalone: true,
  imports: [CommonModule, NutrientPipe],
  templateUrl: './template-comparison.component.html',
  styleUrl: './template-comparison.component.css',
})
export class TemplateComparisonComponent {
  @Input() day: dayOfWeek = dayOfWeek.Sunday;
  @Input() templateIndex: any;
  @Input() templates: MealTemplate[] = [];
  dailyMacros:
    | { calories: number; protein: number; carbs: number; fat: number }
    | undefined;

  constructor(
    private readonly templateService: TemplatesService,
    private readonly mealPlanService: MealPlanService
  ) {}

  // getMeals() {
  //   if (!this.templates) [];

  //   return this.mealPlanService.getMealsByIds(
  //     this.templates[index].meals[this.day]
  //   );
  // }

  // getDailyMacros(meals: (Meal | undefined)[] | null) {
  //   if (!this.templates || !meals) return;

  //   return meals.reduce(
  //     (acc, meal) => {
  //       if (meal) {
  //         acc.calories +=
  //           meal.nutrients.find((n) => n.name === 'Calories')?.amount || 0;
  //         acc.protein +=
  //           meal.nutrients.find((n) => n.name === 'Protein')?.amount || 0;
  //         acc.carbs +=
  //           meal.nutrients.find((n) => n.name === 'Carbohydrates')?.amount || 0;
  //         acc.fat += meal.nutrients.find((n) => n.name === 'Fat')?.amount || 0;
  //       }
  //       return acc;
  //     },
  //     { calories: 0, protein: 0, carbs: 0, fat: 0 }
  //   );
  // }
}
