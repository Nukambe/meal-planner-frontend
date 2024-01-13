import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { MealTemplate } from 'meal-planner-types';

@Injectable({ providedIn: 'root' })
export class TemplatesService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  getTemplates(): Observable<any> {
    return this.http.get('/api/templates');
  }

  modifyTemplates(templates: MealTemplate[]): Observable<MealTemplate[]> {
    // this.http.put('/api/plans', plan);
    return of(templates).pipe(
      catchError((err) => {
        console.log('Error modifying plan', err);
        return EMPTY;
      })
    );
  }
}
