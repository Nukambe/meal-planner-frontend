import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as templateActions from '../store/templates/templates.actions';
import * as planActions from '../store/plans/plans.actions';
import { PlansEffects } from '../store/plans/plans.effects';
import * as mealActions from '../store/meals/meals.actions';
import { MealPlan } from 'meal-planner-types';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  routes: { path: string; label: string }[] = [
    { path: '', label: 'Dashboard' },
    { path: '/templates', label: 'Templates' },
    { path: '/meals', label: 'Meals' },
  ];
  user: string = '';
  loginError: boolean = false;
  registerError: string = '';

  constructor(
    private store: Store,
    private http: HttpClient,
    private plansEffects: PlansEffects
  ) {}

  onSignOut() {
    this.user = '';
    document.cookie =
      'mp-authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.store.dispatch(templateActions.getTemplatesSuccess({ templates: [] }));
    this.store.dispatch(
      planActions.getPlanSuccess({ plan: new MealPlan([], []) })
    );
  }

  onLogin(username: string, password: string, event: Event) {
    event.preventDefault();
    this.http
      .post('/api/auth/signin', {
        username,
        password,
      })
      .pipe(take(1))
      .subscribe((res: any) => {
        const token = res['access_token'];
        if (!token) {
          this.loginError = true;
          return;
        }
        document.cookie = `mp-authorization=${res['access_token']}`;
        this.user = res.username;
        const plan = this.plansEffects.convertPlan(
          res.plan.plannedMeals,
          res.plan.plannedGoals
        );
        this.store.dispatch(planActions.getPlanSuccess({ plan }));
        this.store.dispatch(
          templateActions.getTemplatesSuccess({ templates: res.templates })
        );
        this.store.dispatch(
          mealActions.getDbMealsSuccess({ meals: res.meals })
        );
      });
  }

  onRegister(
    username: string,
    password: string,
    confirm: string,
    event: Event
  ) {
    event.preventDefault();
    if (!this.validatePassword(password, confirm)) {
      this.registerError = 'Passwords do not match';
      return;
    }
    this.http
      .post('/api/auth/signup', {
        username,
        password,
      })
      .pipe(take(1))
      .subscribe((res: any) => {
        const token = res['access_token'];
        if (!token) {
          this.registerError = 'Username already exists';
          return;
        }
        document.cookie = `mp-authorization=${res['access_token']}`;
        this.user = res.username;
        const plan = new MealPlan([], []);
        this.store.dispatch(planActions.getPlanSuccess({ plan }));
        this.store.dispatch(
          templateActions.getTemplatesSuccess({ templates: [] })
        );
        this.store.dispatch(
          mealActions.getDbMealsSuccess({ meals: res.meals })
        );
      });
  }

  validatePassword(password: string, confirm: string) {
    return password === confirm;
  }
}
