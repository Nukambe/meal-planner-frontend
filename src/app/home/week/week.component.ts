import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week.component.html',
  styleUrl: './week.component.css',
})
export class WeekComponent implements OnInit {
  @Input() weekStart: Date = new Date();
  weekNumber: number;

  constructor() {
    this.weekNumber = this.getWeekNumber();
  }

  ngOnInit(): void {
    this.weekNumber = this.getWeekNumber();
  }

  getWeekNumber(): number {
    const yearStart = new Date(this.weekStart.getFullYear(), 0, 1);
    const yearStartDayOfWeek = yearStart.getDay();
    const days = Math.floor(
      (this.weekStart.getTime() - yearStart.getTime()) / 86400000
    );

    return Math.ceil((days + yearStart.getDay() + yearStartDayOfWeek) / 7);
  }

  getWeekDates(): number[] {
    const weekDates: number[] = [];

    for (let i = 0; i < 7; i++) {
      weekDates.push(
        new Date(
          this.weekStart.getFullYear(),
          this.weekStart.getMonth(),
          this.weekStart.getDate() + i
        ).getDate()
      );
    }

    return weekDates;
  }
}
