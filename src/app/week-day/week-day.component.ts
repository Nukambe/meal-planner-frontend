import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanService } from '../meal-plan.service';
import { dayOfWeek } from 'meal-planner-types';
import { Observable } from 'rxjs';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { PlannedMealComponent } from '../planned-meal/planned-meal.component';

@Component({
  selector: 'app-week-day',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe, PlannedMealComponent],
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
}
