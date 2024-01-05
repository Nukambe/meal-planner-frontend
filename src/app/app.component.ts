import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Store } from '@ngrx/store';
import * as MealsActions from './store/meals/meals.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'mp-frontend';

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(MealsActions.getAllMeals());
  }
}
