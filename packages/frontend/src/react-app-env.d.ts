/// <reference types="react-scripts" />

// Declare global variables for TypeScript and VSCode.
// Do not rename this file or move these types into index.d.ts
// @see https://code.visualstudio.com/docs/nodejs/working-with-javascript#_global-variables-and-type-checking

import { Context } from 'react';
import { ReactReduxContextValue, RootStateOrAny } from 'react-redux';
import { Action, AnyAction, Dispatch } from 'redux';

declare module 'react-redux' {
  function createDispatchHook<
    S = RootStateOrAny,
    TDispatch = Dispatch<any>,
    A extends Action = AnyAction
  >(context?: Context<ReactReduxContextValue<S, A>>): () => TDispatch;
}

/**
 * @types/react-google-recaptcha is an old version and in conflict with @types/react
 */
declare module 'react-google-recaptcha' {
  class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
    /**
     * Resets the reCAPTCHA widget.
     */
    reset(): void;

    /**
     * Programatically invoke the reCAPTCHA check.
     * Used if the invisible reCAPTCHA is on a div instead of a button.
     */
    execute(): void;

    /**
     * Programmatically invoke the challenge and return a promise that resolves
     * to the token or errors (if encountered). Alternative approach to
     * execute() in combination with the onChange() prop.
     * @return token | null
     */
    executeAsync(): Promise<string | null>;

    /**
     * Gets the response for the reCAPTCHA widget.
     * @return the response of the reCAPTCHA widget.
     */
    getValue(): string | null;

    /**
     * Gets the widgetId of reCAPTCHA widget.
     * @return widgetId | null
     */
    getWidgetId(): number | null;
  }
  export = ReCAPTCHA;
}

declare const __DEV__: boolean;
