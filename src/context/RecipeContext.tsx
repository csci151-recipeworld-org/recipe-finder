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
  isLoading: boolean;
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading] = useState(false);

  const addRecipe = useCallback((recipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
  }, []);

  const value = useMemo(
    () => ({
      recipes,
      addRecipe,
      isLoading,
    }),
    [recipes, addRecipe, isLoading],
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
