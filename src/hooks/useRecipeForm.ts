import { useState } from 'react';
import type { Recipe } from '../types/recipe';

export interface RecipeFormData {
  name: string;
  ingredients: string;
  instructions: string;
  category: Recipe['category'];
}

export const useRecipeForm = (initialState?: RecipeFormData) => {
  const [formData, setFormData] = useState<RecipeFormData>(
    initialState ?? {
      name: '',
      ingredients: '',
      instructions: '',
      category: 'Breakfast',
    },
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      category: 'Breakfast',
    });
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
  };
};
