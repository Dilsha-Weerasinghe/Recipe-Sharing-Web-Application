import React, { useState, useContext } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('foodie-users')) || [];
    const existingUser = storedUsers.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (existingUser) {
      login(existingUser);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-background">
      <Container maxWidth="sm" className="auth-container">
        <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h4" align="center" gutterBottom className="auth-title">
            Login to Foodie
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" sx={{ mt: 2 }} noValidate>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              autoComplete="email"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              autoComplete="current-password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              className="auth-button"
              onClick={handleLogin}
            >
              Login
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}