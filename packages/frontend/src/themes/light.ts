import { ThemeOptions } from '@mui/material';

export const light: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2c2c2c',
    },
    secondary: {
      main: '#72737a',
    },
    divider: 'rgba(44,44,44,0.5)',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2c2c2c',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(44,44,44,0.51)',
        },
      },
    },
  },
};
