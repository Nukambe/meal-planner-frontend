import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MealTemplate } from 'meal-planner-types';

@Component({
  selector: 'app-template-button',
  standalone: true,
  imports: [],
  templateUrl: './template-button.component.html',
  styleUrl: './template-button.component.css',
})
export class TemplateButtonComponent {
  @Input() template: MealTemplate | undefined;
  @Output() edit = new EventEmitter<void>();

  editTemplate() {
    this.edit.emit();
  }
}
