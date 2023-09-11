import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Divider, styled } from '@mui/material';
import { LanguageSelect, Button } from '~/components';
import { FooterLink } from './FooterLink';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { togglePaletteMode } from '~/store/app/actions';

const PageFooterRoot = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(3, 0),
    '.footer-links': {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      fontSize: '15px',
    },
    '.MuiContainer-root': {
      maxWidth: '700px',
    },
    [theme.breakpoints.down('lg')]: {
      '.MuiContainer-root': {
        maxWidth: 'none',
      },
      '.footer-links': {
        textAlign: 'center',
        display: 'block',
        '.MuiDivider-root': {
          display: 'block',
          borderRightWidth: 0,
          borderBottomWidth: 'thin',
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
        },
      },
    },
  };
});

export const PageFooter = () => {
  const { t } = useTranslation('accounts/pageFooter');
  const dispatch = useAppDispatch();
  const paletteMode = useAppSelector(({ app }) => app.paletteMode);

  const handleChangePaletteMode = () => {
    dispatch(togglePaletteMode());
  };

  const paletteModeLabel = paletteMode === 'dark' ? 'Light mode' : 'Dark mode';

  return (
    <PageFooterRoot component="footer">
      <Container maxWidth={false}>
        <Box className="footer-links" onClick={(event) => event.preventDefault()}>
          <FooterLink href="#">{t('contactLink')}</FooterLink>
          <Divider orientation="vertical" flexItem />
          <FooterLink href="#">{t('imprintLink')}</FooterLink>
          <Divider orientation="vertical" flexItem />
          <FooterLink href="#">{t('conditionsUseLink')}</FooterLink>
          <Divider orientation="vertical" flexItem />
          <FooterLink href="#">{t('dataProtectionLink')}</FooterLink>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LanguageSelect />
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Button variant="outlined" onClick={handleChangePaletteMode}>
            {t(paletteModeLabel)}
          </Button>
        </Box>
      </Container>
    </PageFooterRoot>
  );
};
