import React from "react";
import type { Recipe } from "../types/recipe";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onBack,
  onToggleFavorite,
}) => {
  const cookingTimeMinutes = recipe.cookingTimeMinutes ?? 30;
  const servings = recipe.servings ?? 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={onBack}
          className="mb-6 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
        >
          ← Back to Recipes
        </button>

        <article className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-lg">
          <div
            className="h-64 w-full bg-gray-200"
            aria-label="Recipe image placeholder"
          />

          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  {recipe.name}
                </h1>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-amber-800">
                  {recipe.category}
                </span>
              </div>
              <button
                onClick={() => onToggleFavorite(recipe.id)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  recipe.isFavorite
                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                aria-label={
                  recipe.isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {recipe.isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
              </button>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">Cooking Time:</span>{" "}
                {cookingTimeMinutes} minutes
              </p>
              <p>
                <span className="font-semibold text-gray-800">Servings:</span>{" "}
                {servings}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                Ingredients
              </h2>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                Instructions
              </h2>
              <p className="whitespace-pre-line text-gray-700">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};