import React from 'react';
import { SvgIcon, styled } from '@mui/material';

const Icon = styled(SvgIcon)({
  color: '#fff',
  transform: 'scale(1.2)',
  marginLeft: '.4rem',
  marginRight: '1rem',
});

export const MicrosoftIcon = () => (
  <Icon viewBox="0 0 512 512">
    <path fill="#4CAF50" d="M272,240h240V16c0-8.832-7.168-16-16-16H272V240z" />
    <path fill="#F44336" d="M240,240V0H16C7.168,0,0,7.168,0,16v224H240z" />
    <path fill="#2196F3" d="M240,272H0v224c0,8.832,7.168,16,16,16h224V272z" />
    <path fill="#FFC107" d="M272,272v240h224c8.832,0,16-7.168,16-16V272H272z" />
  </Icon>
);
