import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Recipes.css';

export default function Recipes() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes');
        const data = await res.json();

        const localRecipes = JSON.parse(localStorage.getItem('foodie-recipes')) || [];
        
        const formattedLocal = localRecipes.map((r) => ({
          id: `local-${r.id}`,
          name: r.title || 'Untitled Recipe',
          cuisine: r.cuisine || 'Unknown',
          prepTimeMinutes: r.prepTime || 0,
          ingredients: Array.isArray(r.ingredients) 
            ? r.ingredients.map(i => String(i))
            : [],
          image: r.imageUrl && isValidUrl(r.imageUrl)
            ? r.imageUrl
            : 'https://via.placeholder.com/300',
        }));

        const formattedApiRecipes = data.recipes.map(recipe => ({
          ...recipe,
          ingredients: Array.isArray(recipe.ingredients)
            ? recipe.ingredients.map(i => String(i))
            : []
        }));

        const allRecipes = [...formattedLocal, ...formattedApiRecipes];
        setRecipes(allRecipes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setLoading(false);
      }
    };

    fetchRecipes();

    if (user) {
      const saved = JSON.parse(localStorage.getItem('foodie-favorites')) || {};
      setFavorites(saved[user.email] || []);
    }
  }, [user]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isFavorite = (id) => favorites.some(r => r.id === id);

  const toggleFavorite = (recipe) => {
    if (!user) {
      alert('Please log in to favorite recipes.');
      return;
    }

    let updated;
    if (isFavorite(recipe.id)) {
      updated = favorites.filter(r => r.id !== recipe.id);
    } else {
      updated = [...favorites, recipe];
    }

    setFavorites(updated);
    const all = JSON.parse(localStorage.getItem('foodie-favorites')) || {};
    all[user.email] = updated;
    localStorage.setItem('foodie-favorites', JSON.stringify(all));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    return (
      (recipe.name && String(recipe.name).toLowerCase().includes(query)) ||
      (recipe.cuisine && String(recipe.cuisine).toLowerCase().includes(query)) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient => 
        String(ingredient).toLowerCase().includes(query)
      ))
    );
  });

  if (loading) {
    return (
      <div className="recipes-container">
        <h2>Loading recipes...</h2>
      </div>
    );
  }

  return (
    <div className="recipes-container">
      <h1 className="recipes-heading">Recipes</h1>

      <div className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <div className="no-recipes-message">
            {searchQuery 
              ? `No recipes found for "${searchQuery}". Try a different search term.`
              : "No recipes available."}
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
                <h3>{recipe.name}</h3>
                <p>{recipe.cuisine} • {recipe.prepTimeMinutes} mins</p>
              </Link>
              <button
                className="heart-button"
                onClick={() => toggleFavorite(recipe)}
                title={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(recipe.id) ? <FaHeart color="red" /> : <FaRegHeart />}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}