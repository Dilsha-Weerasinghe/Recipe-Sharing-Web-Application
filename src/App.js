import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import Navbar from './Components/Navbar';
import Recipes from './Pages/Recipes';
import RecipeDetails from './Pages/RecipeDetails';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import About from './Pages/About';
import CreateRecipe from './Pages/CreateRecipe';
import MyRecipes from './Pages/MyRecipes';
import EditRecipe from './Pages/EditRecipe';
import Favorites from './Pages/Favorites';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;