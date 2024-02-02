import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  constructor(private readonly filterService: FilterService) {}

  getPage() {
    return this.filterService.getPage();
  }

  onPageChange(page: number) {
    this.filterService.setPage(this.getPage() + page);
  }
}
