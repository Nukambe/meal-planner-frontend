import { Component, Input } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { CommonModule } from '@angular/common';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { Router, RouterLink } from '@angular/router';
import { dayOfWeek } from 'meal-planner-types';

@Component({
  selector: 'app-planned-meal',
  standalone: true,
  imports: [CommonModule, NutrientPipe, RouterLink],
  templateUrl: './planned-meal.component.html',
  styleUrl: './planned-meal.component.css',
})
export class PlannedMealComponent {
  @Input() mealId: number = 0;
  @Input() position: number = 0;
  @Input() week: string = '1/7/21';
  @Input() day: dayOfWeek = dayOfWeek.Sunday;

  constructor(private readonly mealPlanService: MealPlanService) {}

  getMealById() {
    return this.mealPlanService.getMealById(this.mealId);
  }

  getDisplayNutrients(
    nutrients: {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }[]
  ) {
    const display = ['Calories', 'Carbohydrates', 'Fat', 'Protein'];
    return nutrients.filter((nutrient) => display.includes(nutrient.name));
  }

  removePlannedMeal() {
    this.mealPlanService.removePlannedMeal(this.week, this.day, this.position);
  }
}
