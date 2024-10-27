import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '@/styles/theme';
import Logout from '../../auth/Logout';

export default function Navbar() {
  return (
    <AppBar position='static' elevation={0} sx={{backgroundColor: theme.palette.primary.main}}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/*<ChecklistIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: theme.palette.primary.light }} />*/}
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: theme.palette.primary.light,
              textDecoration: 'none',
            }}
          >
            APPNAME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            {/*<ChecklistIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: theme.palette.primary.light }} />*/}
            <Typography
              variant='h6'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontWeight: 700,
                color: theme.palette.primary.light,
                textDecoration: 'none',
              }}
            >
              APPNAME
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Logout />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
