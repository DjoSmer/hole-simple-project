import React from 'react';
import {useField} from 'formik2nd';
import {Autocomplete, AutocompleteProps} from './Autocomplete';

export interface AutocompleteFormikProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
    name: string;
    type?: string;
}

export function AutocompleteFormik<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
>(inProps: AutocompleteFormikProps<T, Multiple, DisableClearable, FreeSolo>) {
    const {name, multiple, type, value, textProps = {}, onChange, onBlur, ...props} = inProps;
    const [field, , helpers] = useField<
        AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['value']
    >({name, type, multiple});
    const {
        onChange: _onChange,
        /*onBlur: _onBlur,*/ multiple: _multiple,
        ...fieldSubselection
    } = field;

    return (
        <Autocomplete
            multiple={multiple}
            {...props}
            {...fieldSubselection}
            textProps={{...textProps, name}}
            onChange={(e, value, reason, details) => {
                if (onChange) onChange(e, value, reason, details);
                helpers.setValue(value);
            }}
        />
    );
}
