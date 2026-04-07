import React, { useState } from "react";
import type { Recipe } from "../types/recipe";
import { useRecipeForm, type RecipeFormData } from "../hooks/useRecipeForm";
import { validateRecipeForm, parseIngredients } from "../utils/recipeValidation";

interface RecipeEditorProps {
  recipe: Recipe;
  onSave: (updatedRecipe: Recipe) => void;
  onCancel: () => void;
}

export const RecipeEditor: React.FC<RecipeEditorProps> = ({
  recipe,
  onSave,
  onCancel,
}) => {
  const initialForm: RecipeFormData = {
    name: recipe.name,
    ingredients: recipe.ingredients.join("\n"),
    instructions: recipe.instructions,
    category: recipe.category,
  };

  const { formData, handleInputChange, setFormData } = useRecipeForm(initialForm);
  const [error, setError] = useState<string>("");

  const categories: Recipe["category"][] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Beverage",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const validation = validateRecipeForm(formData);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onSave({
      ...recipe,
      name: formData.name.trim(),
      ingredients: parseIngredients(formData.ingredients),
      instructions: formData.instructions.trim(),
      category: formData.category,
    });
  };

  const handleReset = () => {
    setFormData(initialForm);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-3xl border border-orange-200 bg-white/90 p-8 shadow-lg">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Edit Recipe</h1>
              <p className="mt-2 text-gray-600">
                Improve or correct the recipe details before saving.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
              >
                Reset Fields
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                  Recipe Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Chocolate Chip Cookies"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-800 mb-2">
                Ingredients (one item per line)
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                rows={6}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-semibold text-gray-800 mb-2">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows={8}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                Editing recipe <span className="font-semibold text-gray-900">{recipe.name}</span>.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
