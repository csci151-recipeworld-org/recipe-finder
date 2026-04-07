import React, { useMemo } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import type { Recipe } from "../types/recipe";

const CATEGORIES: Array<"All" | Recipe["category"]> = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Beverage",
];

export const SearchAndFilter: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    recipes,
    getFilteredRecipes,
  } = useRecipeContext();

  const filteredRecipes = getFilteredRecipes();

  const stats = useMemo(
    () => ({
      totalRecipes: recipes.length,
      filteredRecipesCount: filteredRecipes.length,
      isSearchActive: searchTerm.length > 0,
      isFilterActive: selectedCategory !== "All",
      hasResults: filteredRecipes.length > 0,
    }),
    [recipes.length, filteredRecipes.length, searchTerm, selectedCategory]
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "All";

  return (
    <section className="max-w-2xl mx-auto w-full">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Search & Filter</h2>

        {/* Search Input */}
        <div className="mb-6">
          <label
            htmlFor="search"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            Search Recipes
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by name or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              aria-label="Search recipes by name or ingredients"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-xs text-orange-600 mt-2">
              Found {stats.filteredRecipesCount} recipe
              {stats.filteredRecipesCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter by ${category} category`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Active Filters:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "All" && (
                    <span className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-orange-200">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className="text-orange-600 hover:text-orange-700 transition-colors"
                        aria-label={`Remove ${selectedCategory} filter`}
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-orange-200">
                      "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-orange-600 hover:text-orange-700 transition-colors"
                        aria-label="Remove search filter"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Filter Stats */}
        {(stats.isSearchActive || stats.isFilterActive) && (
          <p className="text-sm text-gray-600">
            Showing {stats.filteredRecipesCount} of {stats.totalRecipes} recipes
          </p>
        )}
      </div>
    </section>
  );
};
