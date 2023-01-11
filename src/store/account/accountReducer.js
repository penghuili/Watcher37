import { appActionTypes } from '../app/appActions';
import { accountActionTypes } from './accountActions';

const initialState = {
  isLoading: false,
  userId: null,
  username: null,
  createdAt: null,
  telegramId: null,
};

function handleSetUserData(state, { userId, username, createdAt, telegramId }) {
  return { ...state, userId, username, createdAt, telegramId };
}

function handleIsLoading(state, { loading }) {
  return { ...state, isLoading: loading };
}

function handleReset() {
  return initialState;
}

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case accountActionTypes.SET_USER_DATA:
      return handleSetUserData(state, action.payload);

    case accountActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case appActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
