import React from "react";
import { RecipeCreation } from "./components/RecipeCreation";
import { RecipeList } from "./components/RecipeList";
import { RecipeProvider } from "./context/RecipeContext";

const App: React.FC = () => {
  return (
    <RecipeProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <RecipeCreation />
          <RecipeList />
        </div>
      </div>
    </RecipeProvider>
  );
};

export default App;
