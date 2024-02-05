import { createReducer, on } from '@ngrx/store';
import * as MealsActions from './meals.actions';
import { Meal } from 'meal-planner-types';

// const sampleMeal1: Meal = {
//   id: 12083120,
//   title: 'Chicken Vesuvio',
//   readyInMinutes: 45,
//   servings: 4,
//   image: 'https://spoonacular.com/recipeImages/1208312-312x231.jpg',
//   imageType: 'jpg',
//   nutrients: [
//     { name: 'Calories', amount: 100, unit: '', percentOfDailyNeeds: 12 },
//     { name: 'Carbohydrates', amount: 200, unit: 'g', percentOfDailyNeeds: 24 },
//     { name: 'Fat', amount: 300, unit: 'g', percentOfDailyNeeds: 36 },
//     { name: 'Protein', amount: 400, unit: 'g', percentOfDailyNeeds: 48 },
//     { name: 'Cholesterol', amount: 500, unit: 'mg', percentOfDailyNeeds: 60 },
//     { name: 'Sodium', amount: 600, unit: 'mg', percentOfDailyNeeds: 72 },
//   ],
//   ingredients: [
//     { id: 1001, name: 'butter', amount: 1, unit: 'tablespoon' },
//     { id: 1002, name: 'chicken', amount: 1, unit: 'pound' },
//     { id: 1003, name: 'potatoes', amount: 1, unit: 'pound' },
//   ],
//   summary:
//     'This Chicken Vesuvio recipe contains chicken, potatoes, peas, white wine, olive oil and more.',
//   cuisines: ['Italian'],
//   dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
//   diets: ['gluten free', 'dairy free', 'paleolithic', 'primal'],
//   instructions: [
//     { number: 1, step: 'Preheat oven to 375 degrees F (190 degrees C).' },
//     {
//       number: 2,
//       step: 'Heat olive oil in a large oven-safe skillet over medium-high heat. Cook chicken in hot oil until browned completely, 3 to 5 minutes per side. Transfer chicken to a plate.',
//     },
//     {
//       number: 3,
//       step: 'Melt butter in the same skillet over medium heat. Add potatoes and cook until golden brown, about 5 minutes. Stir in garlic and cook until fragrant, about 30 seconds. Add wine and chicken broth; bring to a boil while scraping the browned bits of food off of the bottom of the pan with a wooden spoon. Stir in peas and return chicken to the skillet.',
//     },
//   ],
// };

// const sampleMeal2: Meal = {
//   id: 1298621,
//   title: 'Chicken Paprikash',
//   readyInMinutes: 35,
//   servings: 4,
//   image: 'https://spoonacular.com/recipeImages/1298621-312x231.jpg',
//   imageType: 'jpg',
//   nutrients: [
//     { name: 'Calories', amount: 100, unit: '', percentOfDailyNeeds: 12 },
//     { name: 'Carbohydrates', amount: 200, unit: 'g', percentOfDailyNeeds: 24 },
//     { name: 'Fat', amount: 300, unit: 'g', percentOfDailyNeeds: 36 },
//     { name: 'Protein', amount: 400, unit: 'g', percentOfDailyNeeds: 48 },
//     { name: 'Vitamin A', amount: 500, unit: 'mg', percentOfDailyNeeds: 60 },
//     { name: 'Vitamin C', amount: 600, unit: 'mg', percentOfDailyNeeds: 72 },
//     { name: 'Vitamin D', amount: 700, unit: 'mg', percentOfDailyNeeds: 84 },
//   ],
//   ingredients: [
//     { id: 1001, name: 'butter', amount: 1, unit: 'tablespoon' },
//     { id: 1002, name: 'chicken', amount: 1, unit: 'pound' },
//     { id: 1003, name: 'potatoes', amount: 1, unit: 'pound' },
//   ],
//   summary:
//     'This Chicken Paprikash recipe contains chicken, potatoes, peas, white wine, olive oil and more.',
//   cuisines: ['Italian'],
//   dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
//   diets: ['gluten free', 'dairy free', 'paleolithic', 'primal'],
//   instructions: [
//     { number: 1, step: 'Preheat oven to 375 degrees F (190 degrees C).' },
//     {
//       number: 2,
//       step: 'Heat olive oil in a large oven-safe skillet over medium-high heat. Cook chicken in hot oil until browned completely, 3 to 5 minutes per side. Transfer chicken to a plate.',
//     },
//     {
//       number: 3,
//       step: 'Melt butter in the same skillet over medium heat. Add potatoes and cook until golden brown, about 5 minutes. Stir in garlic and cook until fragrant, about 30 seconds. Add wine and chicken broth; bring to a boil while scraping the browned bits of food off of the bottom of the pan with a wooden spoon. Stir in peas and return chicken to the skillet.',
//     },
//   ],
// };

// export const sampleMeals: Meal[] = [sampleMeal1, sampleMeal2];

export interface MealsState {
  meals: Meal[];
}

export const initialState: MealsState = { meals: [] };

export const mealsReducer = createReducer(
  initialState,
  on(MealsActions.getAllMealsSuccess, (state, { meals }) => {
    const newMeals = [...state.meals];
    meals.forEach((meal) => {
      if (!newMeals.find((m) => m.id === meal.id)) {
        newMeals.push(meal);
      }
    });
    return { ...state, meals: newMeals };
  }),
  on(MealsActions.getDbMealsSuccess, (state, { meals }) => {
    return { ...state, meals };
  })
);
