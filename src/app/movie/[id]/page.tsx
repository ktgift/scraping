'use client';
import { useMovies } from '@/hooks/useMovie';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  Chip,
  Stack,
  Button,
  CardContent,
  IconButton
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useMemo, useState } from 'react';
import { Movie } from '../../../types';
import React from 'react';

export default function MovieDetail({ params }: { params: Promise<{ id: number }> }) {
  const { data: movies, isLoading, error } = useMovies();
  const [isFavorite, setIsFavorite] = useState(false);
  const unwrappedParams = React.use(params);

  const movie = useMemo(() => {
    if (!movies) return;
    // Find the movie by index
    return movies.find((m: Movie, index: number) => index === +unwrappedParams?.id);
  }, [movies, unwrappedParams?.id]);

  useEffect(() => {
    if (movie) {
      const favorites = JSON.parse(localStorage.getItem('favorite-movies') || '[]');
      setIsFavorite(favorites.some((fav: Movie) => fav.title === movie.title));
    }
  }, [movie]);

  const toggleFavorite = () => {
    if (!movie) return;

    const favorites = JSON.parse(localStorage.getItem('favorite-movies') || '[]');
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((fav: Movie) => fav.title !== movie.title);
    } else {
      newFavorites = [...favorites, movie];
    }

    localStorage.setItem('favorite-movies', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Movie not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="outlined" color="warning" startIcon={<ArrowBackIcon />}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <Typography variant="body1" sx={{ '&:hover': { color: 'warning.main' } }}>
              Back to Movies
            </Typography>
          </Link>
        </Button>
        <IconButton
          onClick={toggleFavorite}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          <FavoriteIcon color={isFavorite ? 'error' : 'action'} />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={movie.imageUrl}
              alt={movie.title}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {movie.title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={movie.director} color="primary" />
          </Stack>

          {movie.director && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                เรื่องย่อ
              </Typography>
              <Typography variant="body1">
                {movie.description}
              </Typography>
            </Box>
          )}

          {movie.link && (
            <Box sx={{ mt: 2, position: 'relative', height: '300px' }}>
              <Button variant="outlined" color="info">
                <Link href={movie.link} target='_blank' style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                  <Typography variant="body1" sx={{ '&:hover': { color: 'info.main' } }}>
                    ตัวอย่างหนัง
                  </Typography>
                </Link>
              </Button>
              <Box>
                <iframe
                  src={movie.link.replace('watch?v=', 'embed/')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="YouTube video"
                  style={{
                    position: 'absolute',
                    top: 50,
                    width: '100%',
                    height: '100%',
                  }}
                ></iframe>
              </Box>
            </Box>)}
        </Grid>
      </Grid>
    </Container>
  );
} 