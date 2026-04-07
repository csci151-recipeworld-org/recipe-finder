import { useMemo } from "react";
import { useRecipeContext } from "../context/RecipeContext";

export const useSearchAndFilter = () => {
  const context = useRecipeContext();
  const filteredRecipes = context.getFilteredRecipes();

  const stats = useMemo(
    () => ({
      totalRecipes: context.recipes.length,
      filteredRecipesCount: filteredRecipes.length,
      isSearchActive: context.searchTerm.length > 0,
      isFilterActive: context.selectedCategory !== "All",
      hasResults: filteredRecipes.length > 0,
    }),
    [
      context.recipes.length,
      filteredRecipes.length,
      context.searchTerm,
      context.selectedCategory,
    ]
  );

  return {
    ...context,
    filteredRecipes,
    stats,
  };
};
