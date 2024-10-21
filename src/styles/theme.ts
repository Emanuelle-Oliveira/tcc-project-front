'use client';
import {red} from "@mui/material/colors";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      background: {
        default: '#303034',
      },
      primary: {
        main: '#1790f8',
        dark: '#303034',
        light: '#e0f1ff',
      },
      secondary: {
        main: '#add9f8',
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: 'monospace',
    },
  });

export default theme;
