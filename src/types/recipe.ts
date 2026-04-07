export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Snack' | 'Beverage';
  cookingTimeMinutes?: number;
  servings?: number;
  isFavorite: boolean;
}
