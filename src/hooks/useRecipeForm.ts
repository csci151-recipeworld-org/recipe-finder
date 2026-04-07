import { useState } from 'react';
import type { Recipe } from '../types/recipe';

interface FormData {
  name: string;
  ingredients: string;
  instructions: string;
  category: Recipe['category'];
}

export const useRecipeForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    ingredients: '',
    instructions: '',
    category: 'Breakfast',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
    handleInputChange,
    resetForm,
  };
};
