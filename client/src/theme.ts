import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4A6AF2',
    },
    secondary: {
      main: '#4D60C5',
    },
    text: {
      primary: '#0A1734',
    },
    grey: {
      200: '#DFE1E6',
      300: '#C2C5CE',
      400: '#8F95A4',
      500: '#5C6578',
      800: '#2c2e30',
      900: '#1e2022',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }:any) => ({
          color: theme.palette.text.primary,
        }),
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }:any) => ({
          textTransform: 'none',
          borderRadius: '8px',
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingTop: '8px',
          paddingBottom: '8px',
          boxShadow: 'none',
        }),
      },
    },
  }
});

export default theme;
