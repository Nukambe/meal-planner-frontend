import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nutrient',
  standalone: true,
})
export class NutrientPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'calories': {
        return 'Calories';
      }
      case 'carbohydrates': {
        return 'Carbs';
      }
      case 'fat': {
        return 'Fats';
      }
      case 'protein': {
        return 'Protein';
      }
      default: {
        return value;
      }
    }
  }
}
