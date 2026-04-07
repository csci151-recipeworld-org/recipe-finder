import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
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
      </div>
    </article>
  );
};
