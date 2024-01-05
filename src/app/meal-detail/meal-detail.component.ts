import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.css',
})
export class MealDetailComponent implements OnInit {
  id: number;
  meals$: Observable<any>;
  meal: any;

  constructor(
    private readonly store: Store<any>,
    private route: ActivatedRoute
  ) {
    this.meals$ = this.store.select((state) => state.meals.meals);
    this.id = +route.snapshot.params['mealId'];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('mealId')!;
    });

    this.meals$.subscribe((meals) => {
      this.meal = meals.find((meal: any) => this.id === meal.id);
      console.log(this.meal);
    });
  }
}
