import { Button, styled } from '@mui/material';

export const MicrosoftButtonRoot = styled(Button)({
  justifyContent: 'flex-start',
  paddingTop: '.9rem',
  paddingBottom: '.9rem',
  color: '#fff',
  borderColor: '#2F2F2F',
  backgroundColor: '#2F2F2F',
  '&:hover': {
    borderColor: '#2F2F2F',
    backgroundColor: '#2F2F2F99',
  },
});
