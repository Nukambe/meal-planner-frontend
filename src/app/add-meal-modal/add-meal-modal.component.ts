import { Component } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { CommonModule } from '@angular/common';
import { WeekSelectionComponent } from '../week-selection/week-selection.component';
import { take } from 'rxjs';
import { Meal, MealTemplate, dayOfWeek } from 'meal-planner-types';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { NutrientPipe } from '../pipes/nutrient.pipe';
import { NutrientFilterPipe } from '../pipes/nutrient-filter.pipe';
import { MacroComparisonComponent } from '../macro-comparison/macro-comparison.component';
import { TemplatesService } from '../templates.service';
import { TemplateComparisonComponent } from '../template-comparison/template-comparison.component';
import { Macros } from '../macros-modal/macros-modal.component';

@Component({
  selector: 'app-add-meal-modal',
  standalone: true,
  imports: [
    CommonModule,
    WeekSelectionComponent,
    DayOfWeekPipe,
    NutrientPipe,
    NutrientFilterPipe,
    MacroComparisonComponent,
    TemplateComparisonComponent,
  ],
  templateUrl: './add-meal-modal.component.html',
  styleUrl: './add-meal-modal.component.css',
})
export class AddMealModalComponent {
  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  selectedDayOfWeek = dayOfWeek.Sunday;
  selectedTemplateIndex = 0;
  constructor(
    private readonly mealPlanService: MealPlanService,
    private readonly templateService: TemplatesService
  ) {}

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

  adjustTemplateCount(templateIndex: number, increment: boolean, day: number) {
    this.selectDayOfWeek(day);
    this.templateService
      .getTemplates()
      .pipe(take(1))
      .subscribe((templates) => {
        const template = templates[templateIndex];
        const newTemplate = {
          title: template.title,
          meals: {
            0: [...template.meals[0]],
            1: [...template.meals[1]],
            2: [...template.meals[2]],
            3: [...template.meals[3]],
            4: [...template.meals[4]],
            5: [...template.meals[5]],
            6: [...template.meals[6]],
          },
          goals: template.goals,
        };
        if (increment) {
          newTemplate.meals[this.selectedDayOfWeek].push(this.getMealId());
        } else {
          const index = newTemplate.meals[this.selectedDayOfWeek].indexOf(
            this.getMealId()
          );
          if (index > -1) {
            newTemplate.meals[this.selectedDayOfWeek].splice(index, 1);
          }
        }
        this.templateService.editTemplate(templateIndex, newTemplate);
      });
  }

  selectDayOfWeek(dayOfWeek: number) {
    this.selectedDayOfWeek = dayOfWeek;
  }

  getMeals(dayOfWeek: dayOfWeek) {
    return this.mealPlanService.getMealsByDay(this.getWeek(), dayOfWeek);
  }

  getTemplates() {
    return this.templateService.getTemplates();
  }

  getTemplateMeals(
    templates: MealTemplate[] | null,
    index: number,
    day: number
  ) {
    if (!templates) return [];
    return this.getNumberOfMeal(templates[index].meals[day as dayOfWeek]);
  }

  changeTemplate(event: Event) {
    const index = (event.target as HTMLInputElement).value;
    console.log('index: ', index);
    this.selectedTemplateIndex = +index;
  }

  getTemplateMealsForDay(day: dayOfWeek) {
    return this.templateService.getTemplateMealsForDay(
      this.selectedTemplateIndex,
      day
    );
  }

  getDayNutrition(meals: (Meal | undefined)[] | null) {
    if (!meals) return { calories: 0, carbs: 0, fat: 0, protein: 0 };
    return meals.reduce(
      (acc, meal) => {
        acc.calories +=
          meal?.nutrients.find((n) => n.name === 'Calories')?.amount || 0;
        acc.carbs +=
          meal?.nutrients.find((n) => n.name === 'Carbohydrates')?.amount || 0;
        acc.fat += meal?.nutrients.find((n) => n.name === 'Fat')?.amount || 0;
        acc.protein +=
          meal?.nutrients.find((n) => n.name === 'Protein')?.amount || 0;
        return acc;
      },
      { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );
  }

  getTemplateMacros(day: dayOfWeek) {
    return this.templateService.getTemplateGoalsForDay(
      this.selectedTemplateIndex,
      day
    );
  }

  getTemplateComparison(
    macro: number,
    goals: {
      calories: { min: number; max: number };
      carbs: { min: number; max: number };
      fat: { min: number; max: number };
      protein: { min: number; max: number };
    } | null,
    nutrient: string
  ) {
    if (!goals) return { remainder: 0, type: '', symbol: '' };
    const goal = goals[nutrient.toLowerCase() as keyof typeof goals];

    if (goal.max === 0) return { remainder: '', type: true, symbol: '' };
    if (macro < goal.min)
      return { remainder: goal.min - macro, type: false, symbol: '▼' };
    if (macro > goal.max)
      return { remainder: macro - goal.max, type: false, symbol: '▲' };
    return { remainder: goal.max - macro, symbol: '▼', type: true };
  }

  closeModal() {}
}
