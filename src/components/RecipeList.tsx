import type { Recipe } from "../types/recipe";
import { RecipeCard } from "./RecipeCard";
import { useRecipeContext } from "../context/RecipeContext";

interface RecipeListProps {
  recipes?: Recipe[];
  isLoading?: boolean;
  onToggleFavorite?: (id: string) => void;
  onViewDetails?: (recipe: Recipe) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  recipes: recipesProp,
  isLoading: isLoadingProp,
  onToggleFavorite,
  onViewDetails,
}) => {
  const { recipes: contextRecipes, isLoading: contextIsLoading } =
    useRecipeContext();
  const recipes = recipesProp ?? contextRecipes;
  const isLoading = isLoadingProp ?? contextIsLoading;

  if (isLoading) {
    return (
      <section
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        aria-label="Loading recipes"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm"
          >
            <div className="h-40 w-full animate-pulse bg-gray-200" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          </article>
        ))}
      </section>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-orange-300 bg-white/80 px-6 py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-gray-800">No recipes yet</p>
        <p className="mt-2 text-sm text-gray-600">
          Create your first recipe to get started.
        </p>
      </div>
    );
  }

  return (
    <section
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </section>
  );
};
