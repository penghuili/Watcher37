import { appActionTypes } from '../app/appActions';
import { accountActionTypes } from './accountActions';

const initialState = {
  isLoading: false,
  isLoadingSettings: false,
  userId: null,
  username: null,
  createdAt: null,
  lastOpenTime: null,
  tried: true,
  telegramId: null,
  expiresAt: null,
  payError: null,
  botPublicKey: null,
};

function handleSetUserData(state, { userId, username, createdAt, botPublicKey }) {
  return { ...state, userId, username, createdAt, botPublicKey };
}

function handleSetSettings(state, { lastOpenTime, expiresAt, tried, telegramId }) {
  return { ...state, lastOpenTime, expiresAt, tried, telegramId };
}

function handleSetPayError(state, { message }) {
  return { ...state, payError: message };
}

function handleIsLoading(state, { loading }) {
  return { ...state, isLoading: loading };
}

function handleIsLoadingSettings(state, { value }) {
  return { ...state, isLoadingSettings: value };
}

function handleReset() {
  return initialState;
}

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case accountActionTypes.SET_USER_DATA:
      return handleSetUserData(state, action.payload);

    case accountActionTypes.SET_SETTINGS:
      return handleSetSettings(state, action.payload);

    case accountActionTypes.SET_PAY_ERROR:
      return handleSetPayError(state, action.payload);

    case accountActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case accountActionTypes.IS_LOADING_SETTINGS:
      return handleIsLoadingSettings(state, action.payload);

    case appActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
