import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, of, repeat } from 'rxjs';
import { MealPlan, plannedGoals, plannedMeals } from 'meal-planner-types';

@Injectable({ providedIn: 'root' })
export class PlansService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  getPlan(): Observable<any> {
    console.log('getPlan');
    return this.http.get('/api/meal-plan', {
      headers: { 'mp-authorization': this.getToken() },
    });
  }

  modifyPlan(plan: MealPlan): Observable<any> {
    console.log('modifyPlan', plan);
    return this.http.patch('/api/meal-plan', plan, {
      headers: {
        'mp-authorization': this.getToken(),
      },
    });
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
