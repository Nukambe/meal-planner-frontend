import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MealPlanService } from '../meal-plan.service';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.css',
})
export class MealDetailComponent implements OnInit {
  id: number;
  meal$: Observable<any> | undefined;

  constructor(
    private mealPlanService: MealPlanService,
    private route: ActivatedRoute
  ) {
    this.id = +route.snapshot.params['mealId'];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('mealId')!;
    });

    this.meal$ = this.mealPlanService.getMealById(this.id);
  }
}
