import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanService } from '../meal-plan.service';
import { dayOfWeek } from 'meal-planner-types';
import { Observable } from 'rxjs';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { PlannedMealComponent } from '../planned-meal/planned-meal.component';
import { Meal } from 'meal-planner-types';
import { NutrientPipe } from '../pipes/nutrient.pipe';

@Component({
  selector: 'app-week-day',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe, PlannedMealComponent, NutrientPipe],
  templateUrl: './week-day.component.html',
  styleUrl: './week-day.component.css',
})
export class WeekDayComponent {
  @Input() day: dayOfWeek = dayOfWeek.Sunday;
  @Input() week: string = '1/7/24';
  showMeals: boolean = false;

  constructor(private mealPlanService: MealPlanService) {}

  getListOfMeals(): Observable<number[]> {
    return this.mealPlanService.getMealIdsByDay(this.week, this.day);
  }

  getListHeight(items: number[]): string {
    if (!this.showMeals) return '0px';
    return (items.length + 1) * 100 + 'px';
  }

  getDailyMealIds() {
    return this.mealPlanService.getMealIdsByDay(this.week, this.day);
  }

  getMeals(ids: number[]) {
    return this.mealPlanService.getMealsByIds(ids);
  }

  getDailyMacros(meals: Meal[]) {
    const macros = [
      { name: 'Calories', amount: 0, unit: '' },
      { name: 'Carbs', amount: 0, unit: 'g' },
      { name: 'Fat', amount: 0, unit: 'g' },
      { name: 'Protein', amount: 0, unit: 'g' },
    ];

    return meals.reduce((acc, meal) => {
      acc[0].amount +=
        meal.nutrients.find((nutrient) => nutrient.name === 'Calories')
          ?.amount || 0;
      acc[1].amount +=
        meal.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates')
          ?.amount || 0;
      acc[2].amount +=
        meal.nutrients.find((nutrient) => nutrient.name === 'Fat')?.amount || 0;
      acc[3].amount +=
        meal.nutrients.find((nutrient) => nutrient.name === 'Protein')
          ?.amount || 0;
      return acc;
    }, macros);
  }
}
