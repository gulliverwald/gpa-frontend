import React from 'react';
import { TooltipProps as MuiTooltipProps } from '@material-ui/core';

export type State = { loading: boolean } | null; // The initial state is `null`.
export type Helper = {
  isOpen: boolean;
  placement: MuiTooltipProps['placement'];
};
export type OptionAction = { payload: unknown[] };
export type OptionDispatch = (action: OptionAction) => void;
export type StateAction = { type: 'request' | 'response' };
export type HelperAction = { payload: Helper };
export type StateDispatch = (action: StateAction) => void;
export type HelperDispatch = (action: HelperAction) => void;

interface ContextValues<O> {
  options: [O[], OptionDispatch];
  state: [State, StateDispatch];
  helper: [Helper, HelperDispatch];
}
export const AutocompleteGlobalContext = React.createContext<
  ContextValues<any>
>({
  options: [[], (): void => {}],
  state: [null, (): void => {}],
  helper: [{ isOpen: false, placement: 'bottom-start' }, (): void => {}],
});

export function useAutocompleteContext<O>(): ContextValues<O> {
  return React.useContext(AutocompleteGlobalContext);
}
