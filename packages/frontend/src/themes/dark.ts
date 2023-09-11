import { ThemeOptions } from '@mui/material';

export const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#adadad',
    },
    background: {
      paper: '#3b3f41',
      default: '#3b3f41',
    },
    divider: 'rgba(255,255,255,0.5)',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(255,255,255,0.5)',
        },
      },
    },
  },
};
