import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TemplatesActions from './store/templates/templates.actions';
import { Meal, MealTemplate, dayOfWeek } from 'meal-planner-types';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  constructor(private readonly store: Store<any>) {}

  getEmptyGoal(day: number) {
    return {
      week: '0/0/00',
      day,
      calories: { min: 0, max: 0 },
      protein: { min: 0, max: 0 },
      carbs: { min: 0, max: 0 },
      fat: { min: 0, max: 0 },
    };
  }

  getEmptyGoals() {
    return {
      0: this.getEmptyGoal(0),
      1: this.getEmptyGoal(1),
      2: this.getEmptyGoal(2),
      3: this.getEmptyGoal(3),
      4: this.getEmptyGoal(4),
      5: this.getEmptyGoal(5),
      6: this.getEmptyGoal(6),
    };
  }

  getTemplates() {
    return this.store.select(
      (state: { templates: { templates: MealTemplate[] } }) =>
        state.templates.templates
    );
  }

  createTemplate(title: string) {
    this.getTemplates()
      .pipe(take(1))
      .subscribe((templates) => {
        const newTemplates = [...templates];
        newTemplates.push({
          title,
          meals: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
          goals: this.getEmptyGoals(),
        });
        this.store.dispatch(
          TemplatesActions.modifyTemplate({ templates: newTemplates })
        );
      });
  }

  removeTemplate(index: number) {
    this.getTemplates()
      .pipe(take(1))
      .subscribe((templates) => {
        console.log('templates: ', templates, 'index: ', index);
        const newTemplates = [...templates];
        newTemplates.splice(index, 1);
        this.store.dispatch(
          TemplatesActions.modifyTemplate({ templates: newTemplates })
        );
      });
  }

  editTemplate(index: number, template: MealTemplate) {
    this.getTemplates()
      .pipe(take(1))
      .subscribe((templates) => {
        const newTemplates = [...templates];
        newTemplates[index] = template;
        this.store.dispatch(
          TemplatesActions.modifyTemplate({ templates: newTemplates })
        );
      });
  }

  getTemplateMealsForDay(template: number, day: dayOfWeek) {
    return this.store.select(
      (state: {
        templates: { templates: MealTemplate[] };
        meals: { meals: Meal[] };
      }) => {
        const mealIds = state.templates.templates[template].meals[day];
        return mealIds.map((id) => state.meals.meals.find((m) => m.id === id));
      }
    );
  }

  getTemplateGoalsForDay(template: number, day: dayOfWeek) {
    return this.store.select(
      (state: { templates: { templates: MealTemplate[] } }) => {
        const goals = state.templates.templates[template].goals[day];
        return {
          calories: goals.calories,
          carbs: goals.carbs,
          fat: goals.fat,
          protein: goals.protein,
        };
      }
    );
  }
}
