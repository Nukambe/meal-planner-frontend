import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanService } from '../meal-plan.service';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

export interface Macros {
  calories: { min: number; max: number };
  carbs: { min: number; max: number };
  protein: { min: number; max: number };
  fat: { min: number; max: number };
}

@Component({
  selector: 'app-macros-modal',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './macros-modal.component.html',
  styleUrl: './macros-modal.component.css',
})
export class MacrosModalComponent {
  constructor(private mealPlanService: MealPlanService) {}

  getDayOfWeek() {
    return this.mealPlanService.getMacroDay();
  }

  getWeek() {
    return this.mealPlanService.getActiveWeek();
  }

  getMacros() {
    return this.mealPlanService.getMacrosByDay(
      this.getWeek(),
      this.getDayOfWeek()
    );
  }

  setMacros(key: string, value: number, min: boolean) {
    if (value < 0) return;

    this.getMacros()
      .pipe(take(1))
      .subscribe((macros) => {
        const newMacros = {
          calories: { ...macros.calories },
          carbs: { ...macros.carbs },
          protein: { ...macros.protein },
          fat: { ...macros.fat },
        };
        newMacros[key as keyof Macros][min ? 'min' : 'max'] = value;
        this.mealPlanService.addPlannedMacros({
          week: this.getWeek(),
          day: this.getDayOfWeek(),
          ...newMacros,
        });
      });
  }

  clearMacros() {
    this.mealPlanService.removePlannedMacros(
      this.getWeek(),
      this.getDayOfWeek()
    );
  }
}
