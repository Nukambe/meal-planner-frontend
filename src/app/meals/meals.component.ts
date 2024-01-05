import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MealComponent } from './meal/meal.component';
import { MealCategoryComponent } from './meal-category/meal-category.component';
import * as CategoriesActions from '../store/categories/categories.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [MealComponent, MealCategoryComponent, CommonModule],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css',
})
export class MealsComponent implements OnInit {
  categories$: Observable<any>;

  constructor(private readonly store: Store<any>) {
    this.categories$ = store.select('categories');
  }

  ngOnInit() {
    this.store.dispatch(CategoriesActions.getAllCategories());
  }
}
