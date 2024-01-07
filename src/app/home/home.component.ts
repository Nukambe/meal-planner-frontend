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
  // yearStart = new Date(this.today.getFullYear(), 0, 1);
  // yearStartDayOfWeek = this.yearStart.getDay();
  // days = Math.floor(
  //   (this.today.getTime() - this.yearStart.getTime()) / 86400000
  // );
  // weekNumber = Math.ceil(
  //   (this.days + this.yearStart.getDay() + this.yearStartDayOfWeek) / 7
  // );
  startOfWeek = this.today.getDate() - this.today.getDay();
  displayWeeks: Date[] = [];

  constructor(private readonly store: Store<any>) {
    this.meals$ = this.store.select((state) => state.meals.meals);
  }

  ngOnInit(): void {
    for (let i = 6; i > 0; i--) {
      this.displayWeeks.push(
        new Date(
          this.today.getFullYear(),
          this.today.getMonth(),
          this.startOfWeek - i * 7
        )
      );
    }

    for (let i = 0; i < 13; i++) {
      this.displayWeeks.push(
        new Date(
          this.today.getFullYear(),
          this.today.getMonth(),
          this.startOfWeek + i * 7
        )
      );
    }
  }
}
