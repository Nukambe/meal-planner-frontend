import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { dayOfWeek, Meal } from 'meal-planner-types';
import { MealPlanService } from '../meal-plan.service';
import { Observable } from 'rxjs';
import { Macros } from '../macros-modal/macros-modal.component';

@Component({
  selector: 'app-macro-comparison',
  standalone: true,
  imports: [CommonModule, NutrientPipe],
  templateUrl: './macro-comparison.component.html',
  styleUrl: './macro-comparison.component.css',
})
export class MacroComparisonComponent {
  @Input() day = dayOfWeek.Sunday;
  @Input() onlyCompare = false;

  constructor(private readonly mealPlanService: MealPlanService) {}

  getMealId() {
    return this.mealPlanService.getModalMealId();
  }

  getMeal() {
    return this.mealPlanService.getMealById(this.getMealId());
  }

  getWeek() {
    return this.mealPlanService.getActiveWeek();
  }

  getMeals(dayOfWeek: dayOfWeek) {
    return this.mealPlanService.getMealsByDay(this.getWeek(), dayOfWeek);
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

  getMacroGoals(): Observable<Macros> {
    return this.mealPlanService.getMacrosByDay(this.getWeek(), this.day);
  }

  getMacroComparison(key: string, value: number, macros: Macros | null) {
    if (!macros) return { remainder: 0, type: '' };
    const { min, max } = macros[key.toLowerCase() as keyof Macros];
    if (value < min)
      return { remainder: min - value, type: false, symbol: '▼' };
    if (max === 0) return { remainder: '', type: true, symbol: '' };
    if (value > max)
      return { remainder: value - max, type: false, symbol: '▲' };
    return { remainder: max - value, symbol: '▼', type: true };
  }
}
