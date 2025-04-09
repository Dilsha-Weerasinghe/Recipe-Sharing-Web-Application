import React, { useState, useContext } from 'react';
import { Container, TextField, Typography, Button, Paper, Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CreateRecipe.css';

export default function CreateRecipe() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const storedRecipes = JSON.parse(localStorage.getItem('foodie-recipes')) || [];

    const newRecipe = {
      id: Date.now(),
      title: form.title,
      cuisine: form.cuisine,
      prepTime: form.prepTime,
      cookTime: form.cookTime,
      servings: form.servings,
      difficulty: form.difficulty,
      ingredients: form.ingredients.split('\n').filter(i => i.trim() !== ''),
      instructions: form.instructions,
      imageUrl: form.imageUrl,
      createdBy: user.email
    };

    storedRecipes.push(newRecipe);
    localStorage.setItem('foodie-recipes', JSON.stringify(storedRecipes));
    navigate('/recipes');
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper className="login-prompt">
          <Typography variant="h6">Please login or sign up to create a recipe.</Typography>
          <Button variant="contained" className="btn-login" onClick={() => navigate('/login')}>Login</Button>
          <Button variant="outlined" className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper className="recipe-form">
        <Typography variant="h4" className="form-title">Create a New Recipe</Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField fullWidth margin="normal" label="Recipe Title" name="title" value={form.title} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Cuisine" name="cuisine" value={form.cuisine} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Prep Time" name="prepTime" value={form.prepTime} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Cook Time" name="cookTime" value={form.cookTime} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Servings" name="servings" value={form.servings} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Difficulty" name="difficulty" value={form.difficulty} onChange={handleChange} />
          <TextField
            fullWidth multiline minRows={4} margin="normal"
            label="Ingredients (one per line)" name="ingredients" value={form.ingredients}
            onChange={handleChange}
          />
          <TextField
            fullWidth multiline minRows={4} margin="normal"
            label="Instructions" name="instructions" value={form.instructions}
            onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal" label="Image URL"
            name="imageUrl" value={form.imageUrl}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }} className="btn-submit">
            Submit Recipe
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
