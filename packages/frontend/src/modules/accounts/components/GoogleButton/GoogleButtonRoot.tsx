import { Button, colors, styled } from '@mui/material';

const { grey } = colors;

export const GoogleButtonRoot = styled(Button)({
  justifyContent: 'flex-start',
  paddingTop: '.9rem',
  paddingBottom: '.9rem',
  color: '#000',
  borderColor: grey[200],
  backgroundColor: grey[200],
  '&:hover': {
    borderColor: grey[300],
    backgroundColor: grey[300],
  },
});
