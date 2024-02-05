import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { MealTemplate } from 'meal-planner-types';

@Injectable({ providedIn: 'root' })
export class TemplatesService {
  private readonly apiUrl = 'http://localhost:3000/';

  constructor(private readonly http: HttpClient) {}

  getTemplates(): Observable<any> {
    return this.http.get('/api/templates', {
      headers: {
        'mp-authorization': this.getToken(),
      },
    });
  }

  modifyTemplates(templates: MealTemplate[]) {
    return this.http.patch('/api/templates', templates, {
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
