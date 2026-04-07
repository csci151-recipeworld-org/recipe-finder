import type { Recipe } from '../types/recipe';

interface FormData {
  name: string;
  ingredients: string;
  instructions: string;
  category: Recipe['category'];
}

export const validateRecipeForm = (formData: FormData): { isValid: boolean; error: string } => {
  if (!formData.name.trim()) {
    return { isValid: false, error: 'Recipe name is required' };
  }

  if (!formData.ingredients.trim()) {
    return { isValid: false, error: 'At least one ingredient is required' };
  }

  if (!formData.instructions.trim()) {
    return { isValid: false, error: 'Instructions are required' };
  }

  const ingredientList = formData.ingredients
    .split('\n')
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 0);

  if (ingredientList.length === 0) {
    return { isValid: false, error: 'Please add at least one ingredient' };
  }

  return { isValid: true, error: '' };
};

export const parseIngredients = (ingredientString: string): string[] => {
  return ingredientString
    .split('\n')
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 0);
};

export const createRecipe = (formData: FormData): Recipe => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: formData.name.trim(),
    ingredients: parseIngredients(formData.ingredients),
    instructions: formData.instructions.trim(),
    category: formData.category,
    isFavorite: false,
  };
};
