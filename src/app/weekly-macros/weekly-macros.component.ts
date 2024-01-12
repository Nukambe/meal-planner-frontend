import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanService } from '../meal-plan.service';
import { Meal } from 'meal-planner-types';

@Component({
  selector: 'app-weekly-macros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weekly-macros.component.html',
  styleUrl: './weekly-macros.component.css',
})
export class WeeklyMacrosComponent {
  constructor(private readonly mealPlanService: MealPlanService) {}

  getWeek() {
    return this.mealPlanService.getActiveWeek();
  }

  getWeeklyMealIds() {
    return this.mealPlanService.getMealIdsByWeek(
      this.mealPlanService.getActiveWeek()
    );
  }

  getMeals() {
    return this.mealPlanService.getMealsByWeek(this.getWeek());
  }

  getWeeklyMacros(meals: (Meal | undefined)[]) {
    return meals.reduce(
      (acc, meal) => {
        meal?.nutrients.forEach((nutrient) => {
          const index = acc.findIndex((item) => item.name === nutrient.name);
          if (index === -1) {
            acc.push({
              name: nutrient.name,
              amount: nutrient.amount,
              unit: nutrient.unit,
            });
          } else {
            acc[index].amount += nutrient.amount;
          }
        });
        return acc;
      },
      [] as {
        name: string;
        amount: number;
        unit: string;
      }[]
    );
  }
}
