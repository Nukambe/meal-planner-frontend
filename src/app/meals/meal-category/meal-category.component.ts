import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MealComponent } from '../meal/meal.component';

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
  featuredMeals: any;

  constructor(private store: Store<any>) {
    this.meals$ = this.store.select((state) => state.meals.meals);
  }

  ngOnInit(): void {
    this.meals$.subscribe((meals) => {
      this.featuredMeals = meals.filter((meal: any) =>
        this.category.meals.includes(meal.id)
      );
    });
  }
}
