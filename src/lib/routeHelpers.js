import { dispatch } from 'use-bus';
import { navigationBusAction } from './constants';

export const routeHelpers = {
  navigate: path => {
    dispatch({ type: navigationBusAction, payload: { path, replace: false } });
  },
  replace: path => {
    dispatch({ type: navigationBusAction, payload: { path, replace: true } });
  },
  goBack() {
    history.back();
  },
};
