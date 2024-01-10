import { Component, Input } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { CommonModule } from '@angular/common';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-planned-meal',
  standalone: true,
  imports: [CommonModule, NutrientPipe, RouterLink],
  templateUrl: './planned-meal.component.html',
  styleUrl: './planned-meal.component.css',
})
export class PlannedMealComponent {
  @Input() mealId: number = 0;

  constructor(
    private readonly mealPlanService: MealPlanService,
    private readonly router: Router
  ) {}

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
    const display = ['calories', 'carbohydrates', 'fat', 'protein'];
    return nutrients.filter((nutrient) =>
      display.includes(nutrient.name.toLowerCase())
    );
  }
}
