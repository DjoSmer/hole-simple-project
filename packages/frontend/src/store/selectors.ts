import { DispatchThink, RootState } from '~/store';

export const rootSelector = (state: RootState) => state;

export function createAppSelector<T extends RootState = RootState, RT = unknown>(
  func: (state: T) => RT
) {
  return func;
}

export function getSelectorToSet<RS = unknown>(
  selector: (store: RootState) => RS | undefined,
  set: (value: RS) => void
): DispatchThink {
  return (dispatch, getState) => {
    const v = selector(getState());
    if (v) set(v);
  };
}
