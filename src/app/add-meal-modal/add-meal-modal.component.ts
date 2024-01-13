import { Component } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { CommonModule } from '@angular/common';
import { WeekSelectionComponent } from '../week-selection/week-selection.component';
import { take } from 'rxjs';
import { dayOfWeek } from 'meal-planner-types';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { MacroComparisonComponent } from '../macro-comparison/macro-comparison.component';

@Component({
  selector: 'app-add-meal-modal',
  standalone: true,
  imports: [
    CommonModule,
    WeekSelectionComponent,
    DayOfWeekPipe,
    NutrientPipe,
    MacroComparisonComponent,
  ],
  templateUrl: './add-meal-modal.component.html',
  styleUrl: './add-meal-modal.component.css',
})
export class AddMealModalComponent {
  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  selectedDayOfWeek = dayOfWeek.Sunday;
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

  closeModal() {}
}
