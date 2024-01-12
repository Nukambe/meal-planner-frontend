import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week.component.html',
  styleUrl: './week.component.css',
})
export class WeekComponent implements AfterViewInit {
  @Input() weekStart: Date = new Date();
  @Input() currentWeek: boolean = false;
  @ViewChild('weekRef') WeekRef: ElementRef | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.currentWeek) {
      setTimeout(
        () =>
          this.WeekRef?.nativeElement.scrollIntoView({ behavior: 'smooth' }),
        0
      );
    }
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

  getDayOfWeek(index: number): string {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return daysOfWeek[index];
  }

  isToday(date: number): boolean {
    if (!this.currentWeek) return false;
    const today = new Date();
    return today.getDate() === date;
  }
}
