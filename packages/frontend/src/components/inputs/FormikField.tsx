import React from 'react';
import { useField } from 'formik2nd';

export type FormikFieldProps<P> = {
  name: string;
  type?: string;
  as: React.ComponentType<P>;
  asProps?: P;
} & P;

export function FormikField<P extends {}>({
  name,
  type = 'text',
  as,
  asProps = {} as P,
  ...props
}: FormikFieldProps<P>) {
  const [{ value, ...field }] = useField<string>({ name, type });

  return React.createElement<P>(as, {
    ...field,
    ...asProps,
    ...props,
  });
}
