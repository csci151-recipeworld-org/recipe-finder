/// <reference types="vite/client" />
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import type { Recipe } from "./types/recipe";
import { RecipeCreation } from "./components/RecipeCreation";
import { RecipeList } from "./components/RecipeList";
import "./style.css";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleRecipeCreate = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <RecipeCreation onRecipeCreate={handleRecipeCreate} />
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
