import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { FilterService } from '../../../filter.service';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css',
})
export class FilterModalComponent {
  upArrow = '&uarr;';
  downArrow = '&darr;';

  filterGroup = new FormGroup({
    Calories: new FormControl(0, [Validators.min(0)]),
    CalorieOrder: new FormControl(true),
    Carbs: new FormControl(0, [Validators.min(0)]),
    CarbOrder: new FormControl(true),
    Fat: new FormControl(0, [Validators.min(0)]),
    FatOrder: new FormControl(true),
    Protein: new FormControl(0, [Validators.min(0)]),
    ProteinOrder: new FormControl(true),
  });
  filters = {
    Calories: 'CalorieOrder',
    Carbs: 'CarbOrder',
    Fat: 'FatOrder',
    Protein: 'ProteinOrder',
  };

  constructor(private readonly filterService: FilterService) {}

  changeOrder(filter: string) {
    const order = this.filterGroup.get(filter);
    if (order) order.setValue(!order.value);
  }

  clearFilters() {
    this.filterGroup.setValue({
      Calories: 0,
      CalorieOrder: true,
      Carbs: 0,
      CarbOrder: true,
      Fat: 0,
      FatOrder: true,
      Protein: 0,
      ProteinOrder: true,
    });
  }

  applyFilters() {
    this.filterService.setAppliedFilters({
      Calories: {
        value: this.filterGroup.get('Calories')?.value || 0,
        order: this.filterGroup.get('CalorieOrder')?.value || true,
      },
      Carbs: {
        value: this.filterGroup.get('Carbs')?.value || 0,
        order: this.filterGroup.get('CarbOrder')?.value || true,
      },
      Fat: {
        value: this.filterGroup.get('Fat')?.value || 0,
        order: this.filterGroup.get('FatOrder')?.value || true,
      },
      Protein: {
        value: this.filterGroup.get('Protein')?.value || 0,
        order: this.filterGroup.get('ProteinOrder')?.value || true,
      },
    });
  }
}
