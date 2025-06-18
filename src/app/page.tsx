// src/app/page.tsx
'use client';

import { useMovies } from '@/hooks/useMovie';
import { usePaginationStore } from '@/store/paginationStore';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Card, 
  CardMedia,
  CardContent,
  Pagination,
  Stack
} from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const { currentPage, totalPages, setCurrentPage } = usePaginationStore();
  const { data: movies, isLoading, error } = useMovies();

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
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

  // Calculate pagination
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = movies?.slice(startIndex, endIndex) || [];
  const calculatedTotalPages = Math.ceil((movies?.length || 0) / itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Pantip Movies
      </Typography>

      {/* <Grid container spacing={3}>
        {paginatedMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.ref}>
            <Link href={`/movie/${movie.ref}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}>
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
                    {movie.date}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid> */}

      {/* {movies && movies.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Stack spacing={2}>
            <Pagination 
              count={calculatedTotalPages} 
              page={currentPage} 
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
            <Typography variant="body2" color="text.secondary" align="center">
              Page {currentPage} of {calculatedTotalPages}
            </Typography>
          </Stack>
        </Box>
      )} */}
    </Container>
  );
}