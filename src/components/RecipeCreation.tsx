import { useState } from "react";
import type { Recipe } from "../types/recipe";
import { useRecipeForm } from "../hooks/useRecipeForm";
import { validateRecipeForm, createRecipe } from "../utils/recipeValidation";
import { useRecipeContext } from "../context/RecipeContext";

export const RecipeCreation: React.FC = () => {
  const { formData, handleInputChange, resetForm } = useRecipeForm();
  const { addRecipe } = useRecipeContext();
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

    const newRecipe = createRecipe(formData);
    addRecipe(newRecipe);
    resetForm();
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Recipe</h1>
        <p className="text-gray-600 mb-8">
          Add a new recipe to your collection
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Recipe Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Chocolate Chip Cookies"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Ingredients * (one per line)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              placeholder="2 cups flour&#10;1 cup sugar&#10;2 eggs"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Instructions *
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Step-by-step cooking instructions..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Create Recipe
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6">* Required fields</p>
      </div>
    </div>
  );
};
