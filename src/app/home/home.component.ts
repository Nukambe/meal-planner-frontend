import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';
import { WeeklyMacrosComponent } from '../weekly-macros/weekly-macros.component';
import { WeekDayComponent } from '../week-day/week-day.component';
import { WeekSelectionComponent } from '../week-selection/week-selection.component';
import { ShoppingListModalComponent } from '../shopping-list-modal/shopping-list-modal.component';
import { MacrosModalComponent } from '../macros-modal/macros-modal.component';
import { RouterLink } from '@angular/router';
import { TemplatesService } from '../templates.service';
import { MealPlanService } from '../meal-plan.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    WeekComponent,
    WeeklyMacrosComponent,
    WeekDayComponent,
    WeekSelectionComponent,
    ShoppingListModalComponent,
    MacrosModalComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  today = new Date();
  applyingTemplate = false;
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly mealPlanService: MealPlanService
  ) {}

  getTemplates() {
    return this.templatesService.getTemplates();
  }

  applyTemplate(index: number) {
    this.templatesService
      .getTemplates()
      .pipe(take(1))
      .subscribe((templates) => {
        const template = templates[index];
        this.mealPlanService.applyTemplate(
          this.mealPlanService.getActiveWeek(),
          template
        );
      });
  }
}
