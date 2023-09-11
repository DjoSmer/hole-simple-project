import { styled } from '@mui/material';

const LogoRoot = styled('div')(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 700,
  position: 'absolute',
  top: 0,
  left: 0,
  letterSpacing: '0.02em',
  textAlign: 'center',
  color: theme.palette.primary.main,
  textShadow: `5px 0 0 ${theme.palette.secondary.main}`,
}));

export const Logo = () => {
  return <LogoRoot>Hole</LogoRoot>;
};
