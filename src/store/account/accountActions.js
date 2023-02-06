export const accountActionTypes = {
  IS_LOADING: 'account/IS_LOADING',
  IS_LOADING_SETTINGS: 'account/IS_LOADING_SETTINGS',
  SET_USER_DATA: 'account/SET_USER_DATA',
  FETCH_REQUESTED: 'account/FETCH_REQUESTED',
  FETCH_SETTINGS_REQUESTED: 'account/FETCH_SETTINGS_REQUESTED',
  UPDATE_SETTINGS_REQUESTED: 'account/UPDATE_SETTINGS_REQUESTED',
  SET_SETTINGS: 'account/SET_SETTINGS',
  SET_PAY_ERROR: 'account/SET_PAY_ERROR',
  DELETE_PRESSED: 'account/DELETE_PRESSED',
  ADD_TELEGRAM_ID_PRESSED: 'account/ADD_TELEGRAM_ID_PRESSED',
  CHANGE_PASSWORD_PRESSED: 'account/CHANGE_PASSWORD_PRESSED',
  TRY_PRESSED: 'account/TRY_PRESSED',
  PAY_PRESSED: 'account/PAY_PRESSED',
};

export const accountActionCreators = {
  isLoading(loading) {
    return { type: accountActionTypes.IS_LOADING, payload: { loading } };
  },
  isLoadingSettings(value) {
    return { type: accountActionTypes.IS_LOADING_SETTINGS, payload: { value } };
  },
  setUserData({ userId, username, createdAt, telegramId, botPublicKey }) {
    return {
      type: accountActionTypes.SET_USER_DATA,
      payload: { userId, username, createdAt, telegramId, botPublicKey },
    };
  },
  fetchRequested() {
    return { type: accountActionTypes.FETCH_REQUESTED };
  },
  fetchSettingsRequested() {
    return { type: accountActionTypes.FETCH_SETTINGS_REQUESTED };
  },
  updateSettingsRequested(lastOpenTime) {
    return { type: accountActionTypes.UPDATE_SETTINGS_REQUESTED, payload: { lastOpenTime } };
  },
  setSettings({ lastOpenTime, expiresAt, tried }) {
    return { type: accountActionTypes.SET_SETTINGS, payload: { lastOpenTime, expiresAt, tried } };
  },
  setPayError(message) {
    return { type: accountActionTypes.SET_PAY_ERROR, payload: { message } };
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
  changePasswordPressed(currentPassword, newPassword) {
    return {
      type: accountActionTypes.CHANGE_PASSWORD_PRESSED,
      payload: { currentPassword, newPassword },
    };
  },
  tryPressed() {
    return {
      type: accountActionTypes.TRY_PRESSED,
    };
  },
  payPressed(code) {
    return {
      type: accountActionTypes.PAY_PRESSED,
      payload: { code },
    };
  },
};
