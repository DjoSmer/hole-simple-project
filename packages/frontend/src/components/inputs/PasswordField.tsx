import React, { FC, useEffect, useState } from 'react';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField } from '~/components';

type PasswordFieldProps = TextFieldProps & {
  visiblePassword?: any;
  onVisiblePassword?: (showPassword: boolean) => void;
};

export const PasswordField: FC<PasswordFieldProps> = ({
  visiblePassword,
  onVisiblePassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(visiblePassword);

  useEffect(() => {
    setShowPassword(visiblePassword);
  }, [visiblePassword]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    if (onVisiblePassword) onVisiblePassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
      type={showPassword ? 'text' : 'password'}
    />
  );
};

export default PasswordField;
