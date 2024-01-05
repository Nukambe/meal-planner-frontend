import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  routes: { path: string; label: string }[] = [
    { path: '', label: 'Meal Planner' },
    { path: '/shopping-list', label: 'Shopping List' },
    { path: '/meals', label: 'Meals' },
  ];
}
