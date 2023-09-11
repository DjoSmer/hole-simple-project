import React from 'react';
import MuiAutocomplete, {
    AutocompleteProps as MuiAutocompleteProps,
    AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import {TextFieldProps} from '~/components';
import {TextFieldDefault} from './TextFieldDefault';

export interface AutocompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends Omit<MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
    textProps?: TextFieldProps;
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

export function Autocomplete<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
>(inProps: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
    const {renderInput: RenderInput, textProps = {}, ...props} = inProps;
    const defaultRenderInput = (params: AutocompleteRenderInputParams) => (
        <TextFieldDefault loading={props.loading} {...textProps} {...params} />
    );
    const renderInput = RenderInput || defaultRenderInput;

    return <MuiAutocomplete {...props} renderInput={renderInput} />;
}
