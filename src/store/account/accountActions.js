export const accountActionTypes = {
  IS_LOADING: 'account/IS_LOADING',
  SET_USER_DATA: 'account/SET_USER_DATA',
  VIEW_ENTERED: 'account/VIEW_ENTERED',
  FETCH_REQUESTED: 'account/FETCH_REQUESTED',
  DELETE_PRESSED: 'account/DELETE_PRESSED',
  ADD_TELEGRAM_ID_PRESSED: 'account/ADD_TELEGRAM_ID_PRESSED',
  NAV_TO_ACCOUNT_PRESSED: 'account/NAV_TO_ACCOUNT_PRESSED',
};

export const accountActionCreators = {
  isLoading(loading) {
    return { type: accountActionTypes.IS_LOADING, payload: { loading } };
  },
  setUserData({ userId, username, createdAt, telegramId }) {
    return {
      type: accountActionTypes.SET_USER_DATA,
      payload: { userId, username, createdAt, telegramId },
    };
  },
  viewEntered() {
    return { type: accountActionTypes.VIEW_ENTERED };
  },
  fetchRequested() {
    return { type: accountActionTypes.FETCH_REQUESTED };
  },
  deletePressed() {
    return { type: accountActionTypes.DELETE_PRESSED };
  },
  addTelegramIdPressed(telegramId) {
    return {
      type: accountActionTypes.ADD_TELEGRAM_ID_PRESSED,
      payload: { telegramId },
    };
  },
  navToAccountPressed() {
    return {
      type: accountActionTypes.NAV_TO_ACCOUNT_PRESSED,
    };
  },
};
