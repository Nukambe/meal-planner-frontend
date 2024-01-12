import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { MealPlan } from 'meal-planner-types';

@Injectable({ providedIn: 'root' })
export class PlansService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  getPlan(): Observable<any> {
    return this.http.get('/api/plans');
  }

  modifyPlan(plan: MealPlan): Observable<MealPlan> {
    // this.http.put('/api/plans', plan);
    return of(plan).pipe(
      catchError((err) => {
        console.log('Error modifying plan', err);
        return EMPTY;
      })
    );
  }
}
