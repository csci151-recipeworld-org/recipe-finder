import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Recipe } from "../types/recipe";

interface RecipeContextValue {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  toggleFavorite: (id: string) => void;
  isLoading: boolean;
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading] = useState(false);

  const addRecipe = useCallback((recipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, { ...recipe, isFavorite: false }]);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      recipes,
      addRecipe,
      toggleFavorite,
      isLoading,
    }),
    [recipes, addRecipe, toggleFavorite, isLoading],
  );

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};

export const useRecipeContext = (): RecipeContextValue => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }

  return context;
};
