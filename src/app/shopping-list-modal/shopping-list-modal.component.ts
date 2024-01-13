import { Component } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { Meal } from 'meal-planner-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list-modal.component.html',
  styleUrl: './shopping-list-modal.component.css',
})
export class ShoppingListModalComponent {
  constructor(private readonly mealPlanService: MealPlanService) {}

  getMeals() {
    return this.mealPlanService.getMealsByWeek(
      this.mealPlanService.getActiveWeek()
    );
  }

  getShoppingList(meals: (Meal | undefined)[]) {
    return meals.reduce((acc, meal) => {
      if (meal) {
        meal.ingredients.forEach((ingredient) => {
          const existingIngredient = acc.find((i) => i.id === ingredient.id);
          if (existingIngredient) {
            existingIngredient.amount += ingredient.amount;
          } else {
            acc.push({
              id: ingredient.id,
              name: ingredient.name,
              amount: ingredient.amount,
              unit: ingredient.unit,
            });
          }
        });
      }
      return acc;
    }, [] as { id: number; name: string; amount: number; unit: string }[]);
  }
}
