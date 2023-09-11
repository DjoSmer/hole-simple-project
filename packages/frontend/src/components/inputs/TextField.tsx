import React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export type { TextFieldProps };

export const TextField = (inProps: TextFieldProps) => {
  const { InputLabelProps = {}, ...props } = inProps;
  return (
    <MuiTextField
      variant="outlined"
      InputLabelProps={{
        shrink: true,
        ...InputLabelProps,
      }}
      {...props}
    />
  );
};
