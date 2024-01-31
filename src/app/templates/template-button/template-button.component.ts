import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplate } from 'meal-planner-types';
import { TemplatesService } from '../../templates.service';

@Component({
  selector: 'app-template-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-button.component.html',
  styleUrl: './template-button.component.css',
})
export class TemplateButtonComponent {
  @Input() template: MealTemplate | undefined;
  @Output() edit = new EventEmitter<void>();

  constructor(private readonly templatesService: TemplatesService) {}

  editTemplate() {
    this.edit.emit();
  }

  getTemplateMeals() {
    return this.templatesService.getTemplateMealsForWeek(
      this.template || {
        title: '',
        meals: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        goals: this.templatesService.getEmptyGoals(),
      }
    );
  }
}
