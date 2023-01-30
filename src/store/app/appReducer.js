import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';
import { appActionTypes } from './appActions';

const initialState = {
  themeMode: LocalStorage.get(LocalStorageKeys.themeMode) || 'dark',
};

function handleSetThemeMode(state, { themeMode }) {
  return { ...state, themeMode };
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.SET_THEME_MODE:
      return handleSetThemeMode(state, action.payload);

    default:
      return state;
  }
}
