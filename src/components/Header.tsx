'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  useTheme
} from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Header() {
  const pathname = usePathname();
  const theme = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Box sx={{ mr: 2 }}> 
            <img src="https://ptcdn.info/mobile/logo-mobile-pantip-white.png" alt="Pantip Logo" style={{ height: 40 }} />
          </Box>
          
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Button
              startIcon={<HomeIcon />}
              color={isActive('/') ? 'primary' : 'inherit'}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Home
            </Button>
          </Link>

          <Link href="/favorites" passHref style={{ textDecoration: 'none' }}>
            <Button
              startIcon={<FavoriteIcon />}
              color={isActive('/favorites') ? 'primary' : 'inherit'}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Favorites
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 