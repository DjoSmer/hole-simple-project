import React from 'react';
import MuiButton, {ButtonProps as MuiButtonProps} from '@mui/material/Button';

export type ButtonProps = MuiButtonProps;

export const Button = (props: ButtonProps) => {
    return <MuiButton variant="contained" {...props} />;
};
