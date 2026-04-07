/// <reference types="vite/client" />
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import type { Recipe } from './types/recipe';
import { RecipeCreation } from './components/RecipeCreation';
import './style.css';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleRecipeCreate = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <div>
      <RecipeCreation onRecipeCreate={handleRecipeCreate} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
