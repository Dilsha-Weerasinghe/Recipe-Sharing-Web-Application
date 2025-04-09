import React, { useState } from 'react';
import {Container, Box, Typography, TextField, Button, Paper, Alert} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem('foodie-users')) || [];
    const exists = users.find((u) => u.email === formData.email);

    if (exists) {
      setError('Email already registered');
      return;
    }

    const isValid = formData.password.length >= 6 && /[A-Z]/.test(formData.password) && /\d/.test(formData.password);
    if (!isValid) {
      setError('Password must have at least 6 characters, one uppercase, one number');
      return;
    }

    users.push(formData);
    localStorage.setItem('foodie-users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="auth-background">
      <Container maxWidth="sm" className="auth-container">
        <Paper elevation={3} sx={{ p: 4, mt: 8, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" align="center" className="auth-title">Sign Up for Foodie</Typography>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Box sx={{ mt: 2 }}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" />

            <Button fullWidth variant="contained" sx={{ mt: 2 }} className="auth-button" onClick={handleSignUp}>
              Sign Up
            </Button>

            <Typography sx={{ mt: 2 }} align="center">
              Already have an account? <Link to="/login" className="auth-link">Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}