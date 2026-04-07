import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (id: string) => void;
  onViewDetails?: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onToggleFavorite,
  onViewDetails,
}) => {
  const cookingTimeMinutes = recipe.cookingTimeMinutes ?? 30;
  const servings = recipe.servings ?? 2;

  return (
    <article className="h-full overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div
        className="h-40 w-full bg-gray-200"
        aria-label="Recipe thumbnail placeholder"
      />

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-gray-900 sm:text-xl">
            {recipe.name}
          </h2>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
            {recipe.category}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-800">Time:</span>{" "}
            {cookingTimeMinutes} min
          </p>
          <p>
            <span className="font-semibold text-gray-800">Serves:</span>{" "}
            {servings}
          </p>
        </div>

        <div className="flex gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(recipe)}
              className="flex-1 rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              View Details
            </button>
          )}
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                recipe.isFavorite
                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              aria-label={
                recipe.isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {recipe.isFavorite ? "❤️" : "🤍"}
            </button>
          )}
        </div>
