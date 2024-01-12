import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';
import { WeeklyMacrosComponent } from '../weekly-macros/weekly-macros.component';
import { WeekDayComponent } from '../week-day/week-day.component';
import { WeekSelectionComponent } from '../week-selection/week-selection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    WeekComponent,
    WeeklyMacrosComponent,
    WeekDayComponent,
    WeekSelectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  today = new Date();
  constructor() {}
}
