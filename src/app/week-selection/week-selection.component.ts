import { Component, Input } from '@angular/core';
import { MealPlanService } from '../meal-plan.service';
import { Subject } from 'rxjs';
import { WeekComponent } from '../home/week/week.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week-selection',
  standalone: true,
  imports: [WeekComponent, CommonModule],
  templateUrl: './week-selection.component.html',
  styleUrl: './week-selection.component.css',
})
export class WeekSelectionComponent {
  @Input() isModal: boolean = false;
  today = new Date();
  startOfWeek = this.today.getDate() - this.today.getDay();
  displayWeeks: { start: Date; current: boolean }[] = [];
  weekObserver: IntersectionObserver;
  weekTimer: NodeJS.Timeout | undefined;

  constructor(private readonly mealPlanService: MealPlanService) {
    this.weekObserver = new IntersectionObserver(this.onIntersection, {
      threshold: 0.6,
    });
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

    this.weekObserver.observe(document.querySelector('#week-list')!);
  }

  ngAfterViewInit(): void {
    const weeks = document.querySelectorAll('.week-list-item');
    weeks.forEach((week) => this.weekObserver.observe(week));
  }

  onIntersection = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('focused-week', entry.isIntersecting);

      if (entry.isIntersecting) clearTimeout(this.weekTimer);
      this.weekTimer = setTimeout(this.setActiveWeek, 500);
    });
  };

  setActiveWeek = (): void => {
    const focusedWeek = document.getElementsByClassName('focused-week')[1];
    if (!focusedWeek) return;
    this.mealPlanService.setActiveWeek(focusedWeek.id);
  };

  isCurrentWeek(weekStart: Date): boolean {
    const weekEnd = new Date(
      weekStart.getFullYear(),
      weekStart.getMonth(),
      weekStart.getDate() + 6,
      23,
      59,
      59
    );
    console.log(weekStart, weekEnd, this.today);
    return weekStart <= this.today && this.today <= weekEnd;
  }

  setWeek(week: string) {
    this.mealPlanService.setActiveWeek(week);
  }

  getWeek(): string {
    return this.mealPlanService.getActiveWeek();
  }

  scrollToCurrentWeek(): void {
    const week = document.querySelector('.current-week');
    if (week) week.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  ngOnDestroy(): void {
    this.weekObserver.disconnect();
  }
}
