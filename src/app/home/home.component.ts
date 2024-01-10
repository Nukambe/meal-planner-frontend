import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';
import { WeeklyMacrosComponent } from '../weekly-macros/weekly-macros.component';
import { WeekDayComponent } from '../week-day/week-day.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MealPlanService } from '../meal-plan.service';
import { takeUntil, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    WeekComponent,
    WeeklyMacrosComponent,
    WeekDayComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  today = new Date();
  startOfWeek = this.today.getDate() - this.today.getDay();
  displayWeeks: { start: Date; current: boolean }[] = [];
  weekObserver: IntersectionObserver;
  weekTimer: NodeJS.Timeout | undefined;
  viewingWeek: string = '1/7/24';
  ngOnDestroyed$ = new Subject<void>();

  constructor(
    private mealPlanService: MealPlanService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.weekObserver = new IntersectionObserver(this.onIntersection, {
      threshold: 0.5,
    });

    this.route.queryParamMap
      .pipe(takeUntil(this.ngOnDestroyed$))
      .subscribe((params) => {
        const month = params.get('month');
        const day = params.get('day');
        const year = params.get('year');
        this.viewingWeek = `${month}/${day}/${year}`;
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
    if (week) week.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    const [month, day, year] = focusedWeek.id.split('/');

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { year, month, day },
      queryParamsHandling: 'merge',
    });
  };

  getPlanWeek() {
    return this.route.queryParamMap
      .pipe(takeUntil(this.ngOnDestroyed$))
      .subscribe((params) => {
        const month = params.get('month');
        const day = params.get('day');
        const year = params.get('year');
        return `${month}/${day}/${year}`;
      });
  }

  ngOnDestroy(): void {
    this.weekObserver.disconnect();
    this.ngOnDestroyed$.next();
  }
}
