import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './MyRecipes.css';

export default function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('foodie-recipes')) || [];
    if (user?.email) {
      const filtered = storedRecipes.filter(recipe => recipe.createdBy === user.email);
      setMyRecipes(filtered);
    }
  }, [user]);

  const handleDelete = (id) => {
    const storedRecipes = JSON.parse(localStorage.getItem('foodie-recipes')) || [];
    const updatedRecipes = storedRecipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('foodie-recipes', JSON.stringify(updatedRecipes));
    setMyRecipes(updatedRecipes);
  };

  if (!user) {
    return (
      <div className="recipes-container not-logged-in-bg centered-message">
        <div className="login-box">
          <h2>Please login to view your recipes.</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipes-container">
      <h1 className="recipes-heading">My Recipes</h1>

      {myRecipes.length === 0 ? (
        <p>You haven't created any recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {myRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img
                src={recipe.imageUrl || 'https://media-hosting.imagekit.io/101400434b1e4bbd/11444.jpg?Expires=1838806949&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wrndXxQsd7jtCOEpLaNlN1aF918~UagUScn~hG1Q3fB~IhovB3~Lvc7sp5TxCaNDWwrHYIgmaVVuVd9UKvtliXlj1x6QibLbFXovWayZfwFTqcWNkIVuL-MRGgWaBsLqJilTP-sl9peSEOVR5z8l5HzPNAhYlktmwGJAOl4ja4-t1zBlHS-I0zq3Zj6kUWPrCMNEnNKzFvrNhhIEeKHNAOYcsQRRyVqs61vRAu61GgA4d6w0KGS0h1rO9mn~QXLw75wwRN3aLjs7ytfECSUB58cNtIJOBWBoFprh7hu7YNi9GH1U7awZKYAAczy7tYXVqeCFGlD0pon5PPzMXPDylg__'}
                alt={recipe.title}
                className="recipe-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://media-hosting.imagekit.io/101400434b1e4bbd/11444.jpg?Expires=1838806949&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wrndXxQsd7jtCOEpLaNlN1aF918~UagUScn~hG1Q3fB~IhovB3~Lvc7sp5TxCaNDWwrHYIgmaVVuVd9UKvtliXlj1x6QibLbFXovWayZfwFTqcWNkIVuL-MRGgWaBsLqJilTP-sl9peSEOVR5z8l5HzPNAhYlktmwGJAOl4ja4-t1zBlHS-I0zq3Zj6kUWPrCMNEnNKzFvrNhhIEeKHNAOYcsQRRyVqs61vRAu61GgA4d6w0KGS0h1rO9mn~QXLw75wwRN3aLjs7ytfECSUB58cNtIJOBWBoFprh7hu7YNi9GH1U7awZKYAAczy7tYXVqeCFGlD0pon5PPzMXPDylg__';
                }}
              />
              <h3>{recipe.title}</h3>
              <p>{recipe.cuisine} • {recipe.prepTime} mins</p>
              <div className="recipe-actions">
                <Link to={`/edit-recipe/${recipe.id}`}>
                  <IconButton aria-label="edit">
                    <Edit />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(recipe.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
