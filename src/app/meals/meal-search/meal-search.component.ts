import { Component, Input, OnInit } from '@angular/core';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { FilterService } from '../../filter.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-search',
  standalone: true,
  imports: [FilterModalComponent, ReactiveFormsModule],
  templateUrl: './meal-search.component.html',
  styleUrl: './meal-search.component.css',
})
export class MealSearchComponent implements OnInit {
  mealTitle = new FormControl('');
  constructor(private readonly filterService: FilterService) {}

  applyTitleFilter(title: string) {
    this.filterService.setTitleFilter(title);
  }

  ngOnInit(): void {
    this.filterService.initialDispatch();
  }

  onSubmitSearch(event: Event) {
    event.preventDefault();
    console.log('submit search', this.mealTitle);
    this.filterService.setTitleFilter(this.mealTitle.value || '');
  }
}
