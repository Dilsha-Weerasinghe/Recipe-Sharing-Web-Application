import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    cuisine: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: '',
    ingredients: '',
    instructions: '',
    imageUrl: ''
  });

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('foodie-recipes')) || [];
    const recipeToEdit = storedRecipes.find((recipe) => recipe.id === parseInt(id));
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
      setFormData({
        title: recipeToEdit.title,
        cuisine: recipeToEdit.cuisine,
        prepTime: recipeToEdit.prepTime,
        cookTime: recipeToEdit.cookTime,
        servings: recipeToEdit.servings,
        difficulty: recipeToEdit.difficulty,
        ingredients: recipeToEdit.ingredients,
        instructions: recipeToEdit.instructions,
        imageUrl: recipeToEdit.imageUrl
      });
    } else {
      navigate('/recipes');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const storedRecipes = JSON.parse(localStorage.getItem('foodie-recipes')) || [];
    const updatedRecipes = storedRecipes.map((recipe) =>
      recipe.id === parseInt(id) ? { ...recipe, ...formData } : recipe
    );
    localStorage.setItem('foodie-recipes', JSON.stringify(updatedRecipes));
    navigate('/my-recipes');
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Recipe</Typography>
        <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <TextField
            fullWidth
            margin="normal"
            label="Recipe Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Prep Time"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Cook Time"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            margin="normal"
            label="Ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            margin="normal"
            label="Instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
