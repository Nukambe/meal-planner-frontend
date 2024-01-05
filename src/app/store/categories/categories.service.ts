import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get('/api/categories');
  }
}
