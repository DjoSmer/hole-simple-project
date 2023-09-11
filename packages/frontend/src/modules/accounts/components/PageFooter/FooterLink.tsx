import { Link, styled } from '@mui/material';
import { LinkProps } from '@mui/material/Link/Link';

const FooterLinkRoot = styled(Link)({
  '@media (max-width:360px)': {
    fontSize: '.85rem',
  },
});

export const FooterLink = (props: LinkProps) => {
  return <FooterLinkRoot color="secondary" underline="hover" {...props} />;
};
