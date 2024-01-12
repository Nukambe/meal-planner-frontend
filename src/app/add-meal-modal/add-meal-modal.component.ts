import { Component, ElementRef, ViewChild } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { CommonModule } from '@angular/common';
import { WeekSelectionComponent } from '../week-selection/week-selection.component';
import { MealPlan } from 'meal-planner-types';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-meal-modal',
  standalone: true,
  imports: [CommonModule, WeekSelectionComponent],
  templateUrl: './add-meal-modal.component.html',
  styleUrl: './add-meal-modal.component.css',
})
export class AddMealModalComponent {
  @ViewChild('addMealModal') addMealModal!: ElementRef<HTMLDivElement>;
  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
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

  getMeals(dayOfWeek: number) {
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
      this.getMeals(dayOfWeek)
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

  closeModal() {}
}
