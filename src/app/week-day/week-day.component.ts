import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanService } from '../meal-plan.service';
import { dayOfWeek } from 'meal-planner-types';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { PlannedMealComponent } from '../planned-meal/planned-meal.component';
import { Meal } from 'meal-planner-types';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { RouterLink } from '@angular/router';
import { MacroComparisonComponent } from '../macro-comparison/macro-comparison.component';

@Component({
  selector: 'app-week-day',
  standalone: true,
  imports: [
    CommonModule,
    DayOfWeekPipe,
    PlannedMealComponent,
    NutrientPipe,
    RouterLink,
    MacroComparisonComponent,
  ],
  templateUrl: './week-day.component.html',
  styleUrl: './week-day.component.css',
})
export class WeekDayComponent {
  @Input() day: dayOfWeek = dayOfWeek.Sunday;
  showMeals: boolean = false;
  hovered: boolean = false;

  constructor(private mealPlanService: MealPlanService) {}

  getWeek() {
    return this.mealPlanService.getActiveWeek();
  }

  getListHeight(items: number[]): string {
    if (!this.showMeals) return '0px';
    return (items.length + 0.5) * 100 + 'px';
  }

  getDailyMealIds() {
    return this.mealPlanService.getMealIdsByDay(this.getWeek(), this.day);
  }

  getMeals() {
    return this.mealPlanService.getMealsByDay(this.getWeek(), this.day);
  }

  getDailyMacros(meals: (Meal | undefined)[]) {
    const macros = [
      { name: 'Calories', amount: 0, unit: '' },
      { name: 'Carbs', amount: 0, unit: 'g' },
      { name: 'Fat', amount: 0, unit: 'g' },
      { name: 'Protein', amount: 0, unit: 'g' },
    ];

    return meals.reduce((acc, meal) => {
      acc[0].amount +=
        meal?.nutrients.find((nutrient) => nutrient.name === 'Calories')
          ?.amount || 0;
      acc[1].amount +=
        meal?.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates')
          ?.amount || 0;
      acc[2].amount +=
        meal?.nutrients.find((nutrient) => nutrient.name === 'Fat')?.amount ||
        0;
      acc[3].amount +=
        meal?.nutrients.find((nutrient) => nutrient.name === 'Protein')
          ?.amount || 0;
      return acc;
    }, macros);
  }

  changeMacroDay() {
    this.mealPlanService.setMacroDay(this.day);
  }
}
