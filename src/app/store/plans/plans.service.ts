import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, of, repeat, take } from 'rxjs';
import { MealPlan, plannedGoals, plannedMeals } from 'meal-planner-types';

@Injectable({ providedIn: 'root' })
export class PlansService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  getPlan(): Observable<any> {
    return this.http.get('/api/meal-plan', {
      responseType: 'json',
      headers: { 'mp-authorization': this.getToken() },
    });
  }

  modifyPlan(plan: MealPlan): Observable<any> {
    this.http
      .patch('/api/meal-plan', plan, {
        responseType: 'json',
        headers: {
          'mp-authorization': this.getToken(),
        },
      })
      .pipe(take(1))
      .subscribe();

    return of(plan);
  }

  getToken() {
    const cookies = document.cookie.split(';');
    const mpAuthorization = cookies.find((cookie) =>
      cookie.includes('mp-authorization')
    );
    if (!mpAuthorization) {
      return '';
    }
    const token = mpAuthorization.split('=')[1];
    return token;
  }
}
