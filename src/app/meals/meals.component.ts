import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealComponent } from './meal/meal.component';
import { MealCategoryComponent } from './meal-category/meal-category.component';
import { MealPlanService } from '../meal-plan.service';
import { MealSearchComponent } from './meal-search/meal-search.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Store } from '@ngrx/store';
import { MealFilterPipe } from '../pipes/meal-filter.pipe';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [
    MealFilterPipe,
    MealComponent,
    MealCategoryComponent,
    CommonModule,
    MealSearchComponent,
    PaginationComponent,
  ],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css',
})
export class MealsComponent {
  pageSize = 9;
  constructor(
    private readonly mealPlanService: MealPlanService,
    private readonly filterService: FilterService
  ) {}

  getMeals() {
    return this.mealPlanService.getAllMeals();
  }

  getPage() {
    return this.filterService.getPage();
  }
}
