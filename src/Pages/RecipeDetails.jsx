import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackImage = 'https://media-hosting.imagekit.io/101400434b1e4bbd/11444.jpg?Expires=1838806949&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wrndXxQsd7jtCOEpLaNlN1aF918~UagUScn~hG1Q3fB~IhovB3~Lvc7sp5TxCaNDWwrHYIgmaVVuVd9UKvtliXlj1x6QibLbFXovWayZfwFTqcWNkIVuL-MRGgWaBsLqJilTP-sl9peSEOVR5z8l5HzPNAhYlktmwGJAOl4ja4-t1zBlHS-I0zq3Zj6kUWPrCMNEnNKzFvrNhhIEeKHNAOYcsQRRyVqs61vRAu61GgA4d6w0KGS0h1rO9mn~QXLw75wwRN3aLjs7ytfECSUB58cNtIJOBWBoFprh7hu7YNi9GH1U7awZKYAAczy7tYXVqeCFGlD0pon5PPzMXPDylg__';

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id.startsWith('local-')) {
        const localId = parseInt(id.replace('local-', ''));
        const localRecipes = JSON.parse(localStorage.getItem('foodie-recipes')) || [];
        const found = localRecipes.find((r) => r.id === localId);
        setRecipe(found || null);
        setLoading(false);
      } else {
        try {
          const res = await fetch(`https://dummyjson.com/recipes/${id}`);
          const data = await res.json();
          setRecipe(data);
        } catch (err) {
          console.error('Failed to load recipe:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="recipe-details-container">Loading...</div>;
  if (!recipe) return <div className="recipe-details-container">Recipe not found.</div>;

  const isLocal = id.startsWith('local-');
  const title = isLocal ? recipe.title : recipe.name;
  const image = isLocal ? recipe.imageUrl : recipe.image;
  const cuisine = recipe.cuisine;
  const prepTime = isLocal ? recipe.prepTime : recipe.prepTimeMinutes;
  const cookTime = isLocal ? recipe.cookTime : recipe.cookTimeMinutes;
  const servings = recipe.servings;
  const difficulty = recipe.difficulty;
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : recipe.ingredients.split('\n');
  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : recipe.instructions.split('\n');

  return (
    <div className="recipe-details-container">
      <h1>{title}</h1>
      <img
        src={image || fallbackImage}
        alt={title}
        className="recipe-detail-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />
      <p><strong>Cuisine:</strong> {cuisine}</p>
      <p><strong>Prep Time:</strong> {prepTime} minutes</p>
      <p><strong>Cook Time:</strong> {cookTime} minutes</p>
      <p><strong>Servings:</strong> {servings}</p>
      <p><strong>Difficulty:</strong> {difficulty}</p>

      <p><strong>Ingredients:</strong></p>
      <ul>
        {ingredients.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <p><strong>Instructions:</strong></p>
      <ol>
        {instructions.map((step, index) => <li key={index}>{step}</li>)}
      </ol>
    </div>
  );
}
