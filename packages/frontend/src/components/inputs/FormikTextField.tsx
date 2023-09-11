import React from 'react';
import { useField } from 'formik2nd';
import { TextField } from './TextField';

type FormikTextFieldProps<P extends {}> = {
  name: string;
  as?: React.ComponentType<P>;
  asProps?: P;
} & P;

export function FormikTextField<P extends {}>({
  name,
  as = TextField,
  asProps = {} as P,
  ...props
}: FormikTextFieldProps<P>) {
  const [{ value = '', ...field }, { touched, error }] = useField<string>(name);

  return React.createElement<P>(as, {
    ...field,
    ...asProps,
    ...props,
    value,
    error: touched && Boolean(error),
    helperText: touched && error,
  });
}
