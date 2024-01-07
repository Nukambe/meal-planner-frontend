import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';
import { WeeklyMacrosComponent } from '../weekly-macros/weekly-macros.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WeekComponent, WeeklyMacrosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  meals$: Observable<any>;
  today = new Date();
  startOfWeek = this.today.getDate() - this.today.getDay();
  displayWeeks: { start: Date; current: boolean }[] = [];
  weekObserver: IntersectionObserver;

  constructor(private readonly store: Store<any>) {
    this.meals$ = this.store.select((state) => state.meals.meals);
    this.weekObserver = new IntersectionObserver(this.onIntersection, {
      // root: null,
      threshold: 0.5,
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

    this.weekObserver.observe(document.querySelector('week-list-item')!);
  }

  ngAfterViewInit(): void {
    const weeks = document.querySelectorAll('.week-list-item');
    weeks.forEach((week) => this.weekObserver.observe(week));
  }

  isCurrentWeek(weekStart: Date): boolean {
    const weekEnd = new Date(
      weekStart.getFullYear(),
      weekStart.getMonth(),
      weekStart.getDate() + 6
    );

    return weekStart <= this.today && this.today <= weekEnd;
  }

  scrollToCurrentWeek(): void {
    const week = document.querySelector('.current-week');
    if (week) week.scrollIntoView({ behavior: 'smooth' });
  }

  onIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      console.log('intersecting', entry.target);
      entry.target.classList.toggle('focused-week', entry.isIntersecting);
    });
  }

  ngOnDestroy(): void {
    this.weekObserver.disconnect();
  }
}
