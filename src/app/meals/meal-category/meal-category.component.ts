import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MealComponent } from '../meal/meal.component';
import { Meal } from 'meal-planner-types';

@Component({
  selector: 'app-meal-category',
  standalone: true,
  imports: [CommonModule, MealComponent],
  templateUrl: './meal-category.component.html',
  styleUrl: './meal-category.component.css',
})
export class MealCategoryComponent implements OnInit {
  @Input() category: any;
  meals$: Observable<any>;
  featuredMeals: Meal[] = [];

  constructor(private store: Store<any>) {
    this.meals$ = this.store.select((state) => state.meals.meals);
  }

  ngOnInit(): void {
    this.meals$.subscribe((meals) => {
      this.featuredMeals = meals.filter((_: Meal, index: number) => index < 10);
    });
  }
}
