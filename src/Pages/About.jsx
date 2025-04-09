import React from 'react';
import { Container, Typography, Paper, Button, Link, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-background">
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 2
        }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: '#ff8c00',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            About Foodie
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
            Foodie is a recipe sharing platform created by food lovers, for food lovers. 
            Our mission is simple: to make home cooking more enjoyable and accessible to everyone.
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
            Whether you're a seasoned chef or just starting in the kitchen, Foodie provides 
            a welcoming space to discover, share, and celebrate great recipes from around the world.
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
            Join our growing community of home cooks who are passionate about good food 
            and the joy of cooking.
          </Typography>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/signup"
              sx={{
                bgcolor: '#ff8c00',
                '&:hover': { bgcolor: '#e67e00' },
                px: 4,
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              Join Now
            </Button>
            
            <Typography variant="body2" sx={{ mt: 3 }}>
              Already a member? <Link component={RouterLink} to="/login" sx={{ color: '#ff8c00' }}>Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}