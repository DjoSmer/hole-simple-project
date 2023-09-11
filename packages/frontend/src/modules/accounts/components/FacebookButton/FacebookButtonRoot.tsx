import { Button, styled } from '@mui/material';

export const FacebookButtonRoot = styled(Button)({
  justifyContent: 'flex-start',
  paddingTop: '.7rem',
  paddingBottom: '.7rem',
  backgroundColor: '#3A5998',
  color: '#fff',
  border: 'none',
  '&:hover': {
    backgroundColor: '#3a599899',
    border: 'none',
  },
});
