import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const cookingTimeMinutes = recipe.cookingTimeMinutes ?? 30;
  const servings = recipe.servings ?? 2;

  return (
    <article className="w-full max-w-md overflow-hidden rounded-xl border border-orange-100 bg-white shadow-md">
      <div
        className="h-44 w-full animate-pulse bg-gray-200"
        aria-label="Recipe thumbnail placeholder"
      />

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">{recipe.name}</h2>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
            {recipe.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-800">Time:</span>{" "}
            {cookingTimeMinutes} min
          </p>
          <p>
            <span className="font-semibold text-gray-800">Serves:</span>{" "}
            {servings}
          </p>
        </div>
      </div>
    </article>
  );
};
