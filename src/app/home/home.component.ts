import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WeekComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  meals$: Observable<any>;
  today = new Date();
  startOfWeek = this.today.getDate() - this.today.getDay();
  displayWeeks: { start: Date; current: boolean }[] = [];

  constructor(private readonly store: Store<any>) {
    this.meals$ = this.store.select((state) => state.meals.meals);
  }

  ngOnInit(): void {
    for (let i = 6; i > 0; i--) {
      const date = new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        this.startOfWeek - i * 7
      );
      this.displayWeeks.push({
        start: date,
        current: this.isCurrentWeek(date),
      });
    }

    for (let i = 0; i < 13; i++) {
      const date = new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        this.startOfWeek + i * 7
      );
      this.displayWeeks.push({
        start: date,
        current: this.isCurrentWeek(date),
      });
    }
  }

  isCurrentWeek(weekStart: Date): boolean {
    const weekEnd = new Date(
      weekStart.getFullYear(),
      weekStart.getMonth(),
      weekStart.getDate() + 6
    );

    return weekStart <= this.today && this.today <= weekEnd;
  }
}
