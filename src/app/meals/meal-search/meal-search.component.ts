import { Component } from '@angular/core';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { FilterService } from '../../filter.service';

@Component({
  selector: 'app-meal-search',
  standalone: true,
  imports: [FilterModalComponent],
  templateUrl: './meal-search.component.html',
  styleUrl: './meal-search.component.css',
})
export class MealSearchComponent {
  constructor(private readonly filterService: FilterService) {}

  applyTitleFilter(title: string) {
    this.filterService.setTitleFilter(title);
  }
}
