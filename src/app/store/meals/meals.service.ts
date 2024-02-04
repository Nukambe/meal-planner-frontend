import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MealsService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  getAllMeals(title: string, filters: any, page: number): Observable<any> {
    const query: any = {};
    query.title = title;
    query.offset = page * 9;
    if (filters.Calories.value > 0) {
      if (filters.Calories.order) query.minCalories = filters.Calories.value;
      else query.maxCalories = filters.Calories.value;
    }
    if (filters.Carbs.value > 0) {
      if (filters.Carbs.order) query.minCarbs = filters.Carbs.value;
      else query.maxCarbs = filters.Carbs.value;
    }
    if (filters.Fat.value > 0) {
      if (filters.Fat.order) query.minFat = filters.Fat.value;
      else query.maxFat = filters.Fat.value;
    }
    if (filters.Protein.value > 0) {
      if (filters.Protein.order) query.minProtein = filters.Protein.value;
      else query.maxProtein = filters.Protein.value;
    }
    console.log('calling api to get meals');
    return this.http.get(`/api/meals?${new URLSearchParams(query).toString()}`);
  }
}
