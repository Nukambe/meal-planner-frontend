import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css',
})
export class MealComponent {
  @Input() meal: any;
}
