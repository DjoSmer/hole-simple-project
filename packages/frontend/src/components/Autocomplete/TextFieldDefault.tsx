import React from 'react';
import { AutocompleteRenderInputParams, CircularProgress } from '@mui/material';
import { TextField, TextFieldProps } from '../inputs/TextField';

export type TextFieldDefaultProps = TextFieldProps &
  AutocompleteRenderInputParams & {
    loading?: boolean;
  };

export const TextFieldDefault = ({ loading = false, ...props }: TextFieldDefaultProps) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {props.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  );
};
