import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Store } from '@ngrx/store';
import * as MealsActions from './store/meals/meals.actions';
import * as PlansActions from './store/plans/plans.actions';
import { AddMealModalComponent } from './add-meal-modal/add-meal-modal.component';
import { PlannedMealComponent } from './planned-meal/planned-meal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, AddMealModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'mp-frontend';

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Successfully signed in', data['access_token']);
        document.cookie = `mp-authorization=${data['access_token']}`;
      })
      .then(() => {
        this.store.dispatch(PlansActions.getPlan());
      });
  }
}
