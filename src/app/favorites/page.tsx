'use client';

import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Card, 
  CardMedia,
  CardContent,
  IconButton
} from '@mui/material';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { Movie } from '../../types';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorite-movies');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (movieRef: string) => {
    const updatedFavorites = favorites.filter(movie => movie.title !== movieRef);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorite-movies', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          My Favorites
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography variant="h6" color="text.secondary">
            No favorite movies yet
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        My Favorites
      </Typography>

      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.title}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative'
            }}>
              <Link href={`/movie/${movie.title}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  image={movie.imageUrl}
                  alt={movie.title}
                  sx={{ 
                    height: 400,
                    objectFit: 'cover'
                  }}
                />
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.director}
                  </Typography>
                </CardContent>
              </Link>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
                onClick={() => removeFavorite(movie.title)}
              >
                <FavoriteIcon color="error" />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 