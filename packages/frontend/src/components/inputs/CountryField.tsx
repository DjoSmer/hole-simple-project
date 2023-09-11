import React, { useEffect, useMemo, useState } from 'react';
import { useGetDictionaryQuery } from '~/hooks';
import { Dictionary } from '~/types';
import { AutocompleteFormik } from '../Autocomplete';
import { TextFieldProps } from './TextField';

export interface CountryFieldProps {
  name: string;
  value?: string;
  textProps?: TextFieldProps;
}

export const CountryField = (inProps: CountryFieldProps) => {
  const { value: defaultValue, ...props } = inProps;

  const { data, isLoading } = useGetDictionaryQuery('country');

  const [value, setValue] = useState<Dictionary | null>(null);

  useEffect(() => {
    const code = defaultValue || value?.code;
    if (data && code) {
      setValue(data.entities[code] || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const options = useMemo<Dictionary[]>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => data?.ids.map((id) => data.entities[id]!) || [],
    [data]
  );

  return (
    <AutocompleteFormik
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      loading={isLoading}
      options={options}
      {...props}
    />
  );
};
