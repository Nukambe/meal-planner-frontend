import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MealPlanService } from '../meal-plan.service';
import { Meal } from 'meal-planner-types';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.css',
})
export class MealDetailComponent implements OnInit, OnDestroy {
  id: number;
  meal$: Observable<Meal> | undefined;
  ngOnDestroy$ = new Subject<void>();

  constructor(
    private mealPlanService: MealPlanService,
    private route: ActivatedRoute
  ) {
    this.id = +route.snapshot.params['mealId'];
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((params: ParamMap) => {
        this.id = +params.get('mealId')!;
      });

    this.meal$ = this.mealPlanService.getMealById(this.id);
  }

  showAddMealModal() {
    this.mealPlanService.setModalMealId(this.id);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
