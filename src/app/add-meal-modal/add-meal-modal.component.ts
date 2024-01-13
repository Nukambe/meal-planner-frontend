import { Component, ElementRef, ViewChild } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { CommonModule } from '@angular/common';
import { WeekSelectionComponent } from '../week-selection/week-selection.component';
import { take } from 'rxjs';
import { dayOfWeek } from 'meal-planner-types';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { Meal } from 'meal-planner-types';

@Component({
  selector: 'app-add-meal-modal',
  standalone: true,
  imports: [CommonModule, WeekSelectionComponent, DayOfWeekPipe, NutrientPipe],
  templateUrl: './add-meal-modal.component.html',
  styleUrl: './add-meal-modal.component.css',
})
export class AddMealModalComponent {
  @ViewChild('addMealModal') addMealModal!: ElementRef<HTMLDivElement>;
  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  selectedDayOfWeek: dayOfWeek = 0;
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

  getMealIds(dayOfWeek: number) {
    return this.mealPlanService.getMealIdsByDay(this.getWeek(), dayOfWeek);
  }

  getNumberOfMeal(meals: number[]) {
    return meals.reduce((acc, meal) => {
      if (meal === this.getMealId()) acc++;
      return acc;
    }, 0);
  }

  adjustMealCount(dayOfWeek: number, increment: boolean) {
    if (increment) {
      this.mealPlanService.addPlannedMeal(
        this.getWeek(),
        dayOfWeek,
        this.getMealId()
      );
    } else {
      this.getMealIds(dayOfWeek)
        .pipe(take(1))
        .subscribe((meals) => {
          const index = meals.indexOf(this.getMealId());
          if (index > -1) {
            this.mealPlanService.removePlannedMeal(
              this.getWeek(),
              dayOfWeek,
              index
            );
          }
        });
    }
  }

  selectDayOfWeek(dayOfWeek: number) {
    this.selectedDayOfWeek = dayOfWeek;
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

  closeModal() {}
}
