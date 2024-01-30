import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nutrientFilter',
  standalone: true,
})
export class NutrientFilterPipe implements PipeTransform {
  transform(
    value:
      | {
          name: string;
          amount: number;
          unit: string;
          percentOfDailyNeeds: number;
        }[]
      | undefined
  ) {
    return value?.filter((nutrient) =>
      ['Calories', 'Carbohydrates', 'Fat', 'Protein'].includes(nutrient.name)
    );
  }
}
