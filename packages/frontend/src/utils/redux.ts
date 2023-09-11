import {Context, useRef} from 'react';
import {Dispatch} from 'redux';
import {
    createDispatchHook,
    createSelectorHook,
    TypedUseSelectorHook,
    ReactReduxContextValue,
} from 'react-redux';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit/src/mapBuilders';
import debounce, {Cancelable} from '@mui/utils/debounce';

type extraReducerBuilder<State> = (builder: ActionReducerMapBuilder<State>) => void;

export function extraReducer<State>(extraReducerBuilder: extraReducerBuilder<State>) {
    return extraReducerBuilder;
}

export function createModuleHooks<S = unknown, D extends Dispatch = Dispatch>(
    context: Context<ReactReduxContextValue<S>>
) {
    const useModuleDispatch = createDispatchHook<S>(context) as () => D;
    const useModuleSelector: TypedUseSelectorHook<S> = createSelectorHook(context);

    function useModuleDispatchDebounce(wait?: number) {
        const dispatch = useModuleDispatch();
        const debouncedRef = useRef<D & Cancelable>();

        if (!debouncedRef.current) {
            debouncedRef.current = debounce<D>(dispatch, wait);
            debouncedRef.current.clear();
        }

        return debouncedRef.current;
    }

    return {
        useModuleDispatch,
        useModuleSelector,
        useModuleDispatchDebounce,
    };
}
