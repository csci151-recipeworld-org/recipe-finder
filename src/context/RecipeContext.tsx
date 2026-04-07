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
  deleteRecipe: (id: string) => void;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  getFilteredRecipes: () => Recipe[];
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const deleteRecipe = useCallback((id: string) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
  }, []);
  const getFilteredRecipes = useCallback(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || recipe.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  const value = useMemo(
    () => ({
      recipes,
      addRecipe,
      toggleFavorite,
      deleteRecipe,
      isLoading,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      getFilteredRecipes,
    }),
    [recipes, addRecipe, toggleFavorite, deleteRecipe, isLoading],
    [recipes, addRecipe, toggleFavorite, isLoading, searchTerm, selectedCategory, getFilteredRecipes],
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
