import React, { useState } from "react";
import { RecipeCreation } from "./components/RecipeCreation";
import { RecipeList } from "./components/RecipeList";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { RecipeDetail } from "./components/RecipeDetail";
import { RecipeEditor } from "./components/RecipeEditor";
import { Favorites } from "./components/Favorites";
import { RecipeProvider, useRecipeContext } from "./context/RecipeContext";
import type { Recipe } from "./types/recipe";

const AppContent: React.FC = () => {
  const { recipes, toggleFavorite, updateRecipe } = useRecipeContext();
  const [currentView, setCurrentView] = useState<'home' | 'details' | 'favorites' | 'edit'>('home');
  const { recipes, toggleFavorite, getFilteredRecipes } = useRecipeContext();
  const [currentView, setCurrentView] = useState<'home' | 'details' | 'favorites'>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleViewDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('details');
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('edit');
  };

  const handleViewFavorites = () => {
    setCurrentView('favorites');
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  const handleSaveRecipe = (updatedRecipe: Recipe) => {
    updateRecipe(updatedRecipe);
    setSelectedRecipe(updatedRecipe);
    setCurrentView('details');
  };

  if (currentView === 'edit' && selectedRecipe) {
    return (
      <RecipeEditor
        recipe={selectedRecipe}
        onSave={handleSaveRecipe}
        onCancel={() => setCurrentView('details')}
      />
    );
  }

  if (currentView === 'details' && selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={handleBack}
        onToggleFavorite={toggleFavorite}
        onEditRecipe={handleEditRecipe}
      />
    );
  }

  if (currentView === 'favorites') {
    return (
      <Favorites
        recipes={recipes}
        onBack={handleBack}
        onViewDetails={handleViewDetails}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <RecipeCreation />
        <SearchAndFilter />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recipes</h2>
          <button
            onClick={handleViewFavorites}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            View Favorites ({recipes.filter(r => r.isFavorite).length})
          </button>
        </div>
        <RecipeList
          recipes={getFilteredRecipes()}
          onToggleFavorite={toggleFavorite}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <RecipeProvider>
      <AppContent />
    </RecipeProvider>
  );
};

export default App;
