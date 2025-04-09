import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Recipes.css';
import { Trash2 } from 'lucide-react';

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  const fallbackImage = 'https://media-hosting.imagekit.io/101400434b1e4bbd/11444.jpg?Expires=1838806949&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wrndXxQsd7jtCOEpLaNlN1aF918~UagUScn~hG1Q3fB~IhovB3~Lvc7sp5TxCaNDWwrHYIgmaVVuVd9UKvtliXlj1x6QibLbFXovWayZfwFTqcWNkIVuL-MRGgWaBsLqJilTP-sl9peSEOVR5z8l5HzPNAhYlktmwGJAOl4ja4-t1zBlHS-I0zq3Zj6kUWPrCMNEnNKzFvrNhhIEeKHNAOYcsQRRyVqs61vRAu61GgA4d6w0KGS0h1rO9mn~QXLw75wwRN3aLjs7ytfECSUB58cNtIJOBWBoFprh7hu7YNi9GH1U7awZKYAAczy7tYXVqeCFGlD0pon5PPzMXPDylg__';

  useEffect(() => {
    if (user) {
      const allFavorites = JSON.parse(localStorage.getItem('foodie-favorites')) || {};
      setFavorites(allFavorites[user.email] || []);
    }
  }, [user]);

  const handleDelete = (recipeId) => {
    const updatedFavorites = favorites.filter((r) => r.id !== recipeId);
    setFavorites(updatedFavorites);

    const allFavorites = JSON.parse(localStorage.getItem('foodie-favorites')) || {};
    allFavorites[user.email] = updatedFavorites;
    localStorage.setItem('foodie-favorites', JSON.stringify(allFavorites));
  };

  if (!user) {
    return <div className="recipes-container"><h2>Please log in to see your favorites.</h2></div>;
  }

  return (
    <div className="recipes-container">
      <h1 className="recipes-heading">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any recipes to favorites yet.</p>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <button
                className="delete-icon"
                onClick={() => handleDelete(recipe.id)}
                title="Remove from Favorites"
              >
                <Trash2 size={18} />
              </button>
              <Link to={`/recipes/${recipe.id}`}>
                <img
                  src={recipe.image || fallbackImage}
                  alt={recipe.name}
                  className="recipe-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                <h3>{recipe.name}</h3>
                <p>{recipe.cuisine} • {recipe.prepTimeMinutes} mins</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
