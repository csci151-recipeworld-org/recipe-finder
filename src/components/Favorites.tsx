import React from "react";
import type { Recipe } from "../types/recipe";
import { RecipeCard } from "./RecipeCard";

interface FavoritesProps {
  recipes: Recipe[];
  onBack: () => void;
  onViewDetails: (recipe: Recipe) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({
  recipes,
  onBack,
  onViewDetails,
}) => {
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={onBack}
          className="mb-6 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
        >
          ← Back to Recipes
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Favorite Recipes</h1>
          <p className="mt-2 text-gray-600">
            Your collection of favorite recipes
          </p>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-orange-300 bg-white/80 px-6 py-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-800">
              No favorite recipes yet
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Mark recipes as favorites to see them here.
            </p>
          </div>
        ) : (
          <section
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {favoriteRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                onViewDetails={onViewDetails}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};