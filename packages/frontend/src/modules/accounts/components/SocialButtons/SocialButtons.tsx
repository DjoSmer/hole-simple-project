import React, { FC } from 'react';
import { Box } from '@mui/material';
import { SocialButtonProps } from 'ms/accounts/types';
import { FacebookButton } from '../FacebookButton';
import { GoogleButton } from '../GoogleButton';
import { MicrosoftButton } from '../MicrosoftButton';

const ButtonBox = (props: any) => <Box sx={{ my: 3 }} {...props} />;

export const SocialButtons: FC<SocialButtonProps> = ({ onSuccess, onFail }) => {
  return (
    <>
      <ButtonBox>
        <FacebookButton onSuccess={onSuccess} onFail={onFail} />
      </ButtonBox>
      <ButtonBox>
        <GoogleButton onSuccess={onSuccess} onFail={onFail} />
      </ButtonBox>
      <ButtonBox>
        <MicrosoftButton onSuccess={onSuccess} onFail={onFail} />
      </ButtonBox>
    </>
  );
};
