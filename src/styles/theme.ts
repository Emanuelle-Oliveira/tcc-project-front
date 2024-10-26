import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#e0f1ff'
    },
    primary: {
      main: '#1790f8',
      dark: '#303034',
      light: '#e0f1ff'
    },
    secondary: {
      main: '#add9f8',
    },
  },
  typography: {
    fontWeightBold: 700,
    fontFamily: 'monospace'
  },
});

export default theme;