import { Component } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { MealPlanService } from '../meal-plan.service';
import { TemplateButtonComponent } from './template-button/template-button.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { DayOfWeekPipe } from '../pipes/day-of-week.pipe';
import { plannedGoal } from 'meal-planner-types';

interface TempMeals {
  0: number[];
  1: number[];
  2: number[];
  3: number[];
  4: number[];
  5: number[];
  6: number[];
}

interface TempGoals {
  0: plannedGoal;
  1: plannedGoal;
  2: plannedGoal;
  3: plannedGoal;
  4: plannedGoal;
  5: plannedGoal;
  6: plannedGoal;
}

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [
    TemplateButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    DayOfWeekPipe,
  ],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css',
})
export class TemplatesComponent {
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editingTemplate: number | undefined;
  tmpMeals: TempMeals | undefined;
  tmpGoals: TempGoals | undefined;
  viewDay: number | undefined;

  constructor(
    private readonly templatesService: TemplatesService,
    private readonly mealPlanService: MealPlanService
  ) {}

  getMeal(id: number) {
    return this.mealPlanService.getMealById(id);
  }

  getTemplates() {
    return this.templatesService.getTemplates();
  }

  getTmpGoalByDay(day: number) {
    if (!this.tmpGoals) return undefined;
    const goal = this.tmpGoals[day as keyof TempGoals];
    return {
      calories: goal.calories,
      carbs: goal.carbs,
      fat: goal.fat,
      protein: goal.protein,
    };
  }

  createTemplate(event: Event) {
    event.preventDefault();
    if (!this.title.value || this.title.invalid) return;
    this.templatesService.createTemplate(this.title.value);
    this.title.reset();
  }

  editTemplate(index: number) {
    this.editingTemplate = index;
    this.getTemplates()
      .pipe(take(1))
      .subscribe((templates) => {
        const tmp = templates[index];
        this.title.setValue(tmp.title);
        this.tmpMeals = tmp.meals;
        this.tmpGoals = tmp.goals;
      });
  }

  submitEditTemplate(event: Event) {
    event.preventDefault();
    this.tmpGoals = this.getCurrentNutrientValues();
    this.templatesService.editTemplate(this.editingTemplate as number, {
      title: this.title.value as string,
      meals: this.tmpMeals as TempMeals,
      goals: this.tmpGoals as TempGoals,
    });
  }

  deleteTemplate(index: number) {
    this.templatesService.removeTemplate(index);
  }

  removeMeal(day: number, index: number) {
    if (!this.tmpMeals) return;
    const newMeals = {
      0: [...this.tmpMeals[0]],
      1: [...this.tmpMeals[1]],
      2: [...this.tmpMeals[2]],
      3: [...this.tmpMeals[3]],
      4: [...this.tmpMeals[4]],
      5: [...this.tmpMeals[5]],
      6: [...this.tmpMeals[6]],
    };
    newMeals[day as keyof TempMeals].splice(index, 1);
    this.tmpMeals = newMeals;
    this.tmpGoals = this.getCurrentNutrientValues();
  }

  showDayOfWeek(day: number) {
    if (this.viewDay === day) {
      this.viewDay = undefined;
    } else {
      this.viewDay = day;
    }
  }

  getCurrentNutrientValues() {
    const inputs = document.getElementsByClassName('nutrient-input');
    if (!this.tmpGoals || !this.tmpMeals || !inputs) return;

    const newGoals: TempGoals = this.templatesService.getEmptyGoals();

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement;
      const [day, nutrient, min] = input.id.split('-');
      const value = input.value;
      const goal =
        newGoals[parseInt(day) as keyof TempGoals][
          nutrient as keyof plannedGoal
        ];
      if (typeof goal === 'object') {
        if (min === 'min') {
          if ('min' in goal) goal.min = parseInt(value);
        } else {
          if ('max' in goal) goal.max = parseInt(value);
        }
      }
    }
    return newGoals;
  }
}
