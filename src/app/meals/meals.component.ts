import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealComponent } from './meal/meal.component';
import { MealCategoryComponent } from './meal-category/meal-category.component';
import { MealPlanService } from '../meal-plan.service';
import { MealSearchComponent } from './meal-search/meal-search.component';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [
    MealComponent,
    MealCategoryComponent,
    CommonModule,
    MealSearchComponent,
  ],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css',
})
export class MealsComponent implements OnInit {
  constructor(private readonly mealPlanService: MealPlanService) {}

  ngOnInit() {
    // this.store.dispatch(CategoriesActions.getAllCategories());
  }

  getMeals() {
    return this.mealPlanService.getAllMeals();
  }
}
