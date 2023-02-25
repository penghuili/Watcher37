export const watcherActionTypes = {
  FETCH_CONTENT_PRESSED: 'watcher/FETCH_CONTENT_PRESSED',
  SET_CONTENT: 'watcher/SET_CONTENT',
  SET_CONTENT_ERROR: 'watcher/SET_CONTENT_ERROR',
  IS_LOADING: 'watcher/IS_LOADING',
  IS_LOADING_HISTORY: 'watcher/IS_LOADING_HISTORY',
  IS_CHECKING: 'watcher/IS_CHECKING',
  IS_DELETING: 'watcher/IS_DELETING',
  IS_EDITING_SCHEDULE: 'watcher/IS_EDITING_SCHEDULE',
  SET_WATCHERS: 'watcher/SET_WATCHERS',
  SET_DETAILS: 'watcher/SET_DETAILS',
  SET_HISTORY: 'watcher/SET_HISTORY',
  SET_FETCH_ERROR: 'watcher/SET_FETCH_ERROR',
  IS_LOADING_SETTINGS: 'watcher/IS_LOADING_SETTINGS',
  SET_SETTINGS: 'account/SET_SETTINGS',
  SET_PAY_ERROR: 'account/SET_PAY_ERROR',

  FETCH_SETTINGS_REQUESTED: 'watcher/FETCH_SETTINGS_REQUESTED',
  UPDATE_SETTINGS_REQUESTED: 'account/UPDATE_SETTINGS_REQUESTED',
  TRY_PRESSED: 'account/TRY_PRESSED',
  PAY_PRESSED: 'account/PAY_PRESSED',
  ADD_TELEGRAM_ID_PRESSED: 'account/ADD_TELEGRAM_ID_PRESSED',

  FETCH_WATCHERS_REQUESTED: 'watcher/FETCH_WATCHERS_REQUESTED',
  CREATE_PRESSED: 'watcher/CREATE_PRESSED',
  EDIT_PRESSED: 'watcher/EDIT_PRESSED',
  DELETE_PRESSED: 'watcher/DELETE_PRESSED',
  FETCH_WATCHER_REQUESTED: 'watcher/FETCH_WATCHER_REQUESTED',
  FETCH_HISTORY_REQUESTED: 'watcher/FETCH_HISTORY_REQUESTED',
  CHECK_WATCHER_REQUESTED: 'watcher/CHECK_WATCHER_REQUESTED',
  SCHEDULE_TRIGGER_PRESSED: 'watcher/SCHEDULE_TRIGGER_PRESSED',
  ENCRYPT_PRESSED: 'watcher/ENCRYPT_PRESSED',
  DECRYPT_PRESSED: 'watcher/DECRYPT_PRESSED',
  PUBLIC_PRESSED: 'watcher/PUBLIC_PRESSED',
  PRIVATE_PRESSED: 'watcher/PRIVATE_PRESSED',
  DELETE_TRIGGER_PRESSED: 'watcher/DELETE_TRIGGER_PRESSED',
  DELETE_ITEM_PRESSED: 'watcher/DELETE_ITEM_PRESSED',
};

export const watcherActionCreators = {
  fetchContentPressed(link, selector) {
    return { type: watcherActionTypes.FETCH_CONTENT_PRESSED, payload: { link, selector } };
  },
  setContent(content, contentLink) {
    return { type: watcherActionTypes.SET_CONTENT, payload: { content, contentLink } };
  },
  setContentError(contentError) {
    return { type: watcherActionTypes.SET_CONTENT_ERROR, payload: { contentError } };
  },
  isLoading(value) {
    return { type: watcherActionTypes.IS_LOADING, payload: { value } };
  },
  isLoadingHistory(value) {
    return { type: watcherActionTypes.IS_LOADING_HISTORY, payload: { value } };
  },
  isChecking(checking) {
    return { type: watcherActionTypes.IS_CHECKING, payload: { checking } };
  },
  isDeleting(deleting) {
    return { type: watcherActionTypes.IS_DELETING, payload: { deleting } };
  },
  isEditingSchedule(value) {
    return { type: watcherActionTypes.IS_EDITING_SCHEDULE, payload: { value } };
  },
  setWatchers(watchers, lastOpenTime) {
    return { type: watcherActionTypes.SET_WATCHERS, payload: { watchers, lastOpenTime } };
  },
  setDetails(details) {
    return { type: watcherActionTypes.SET_DETAILS, payload: { details } };
  },
  setHistory(history, startKey, hasMore) {
    return { type: watcherActionTypes.SET_HISTORY, payload: { history, startKey, hasMore } };
  },
  setFetchError(error) {
    return { type: watcherActionTypes.SET_FETCH_ERROR, payload: { error } };
  },
  isLoadingSettings(value) {
    return { type: watcherActionTypes.IS_LOADING_SETTINGS, payload: { value } };
  },
  setSettings({ lastOpenTime, expiresAt, tried, telegramId }) {
    return {
      type: watcherActionTypes.SET_SETTINGS,
      payload: { lastOpenTime, expiresAt, tried, telegramId },
    };
  },
  setPayError(message) {
    return { type: watcherActionTypes.SET_PAY_ERROR, payload: { message } };
  },
  fetchSettingsRequested() {
    return { type: watcherActionTypes.FETCH_SETTINGS_REQUESTED };
  },
  updateSettingsRequested(lastOpenTime) {
    return {
      type: watcherActionTypes.UPDATE_SETTINGS_REQUESTED,
      payload: { lastOpenTime },
    };
  },
  tryPressed() {
    return {
      type: watcherActionTypes.TRY_PRESSED,
    };
  },
  payPressed(code) {
    return {
      type: watcherActionTypes.PAY_PRESSED,
      payload: { code },
    };
  },
  addTelegramIdPressed(telegramId) {
    return {
      type: watcherActionTypes.ADD_TELEGRAM_ID_PRESSED,
      payload: { telegramId },
    };
  },
  fetchWatchersRequested(isHardRefresh) {
    return { type: watcherActionTypes.FETCH_WATCHERS_REQUESTED, payload: { isHardRefresh } };
  },
  createPressed({ title, link, selectors }) {
    return { type: watcherActionTypes.CREATE_PRESSED, payload: { title, link, selectors } };
  },
  editPressed(
    id,
    { title, selectors, link, skipPersonalTelegram, telegramId, isPublic, noDuplication }
  ) {
    return {
      type: watcherActionTypes.EDIT_PRESSED,
      payload: {
        id,
        title,
        selectors,
        link,
        skipPersonalTelegram,
        telegramId,
        isPublic,
        noDuplication,
      },
    };
  },
  deletePressed(id) {
    return { type: watcherActionTypes.DELETE_PRESSED, payload: { id } };
  },
  fetchWatcherRequested(id) {
    return { type: watcherActionTypes.FETCH_WATCHER_REQUESTED, payload: { id } };
  },
  fetchHistoryRequested(id) {
    return { type: watcherActionTypes.FETCH_HISTORY_REQUESTED, payload: { id } };
  },
  checkWatchersRequested(id) {
    return { type: watcherActionTypes.CHECK_WATCHER_REQUESTED, payload: { id } };
  },
  scheduleTriggerPressed(id, rate) {
    return { type: watcherActionTypes.SCHEDULE_TRIGGER_PRESSED, payload: { id, rate } };
  },
  encryptPressed(id) {
    return { type: watcherActionTypes.ENCRYPT_PRESSED, payload: { id } };
  },
  decryptPressed(id) {
    return { type: watcherActionTypes.DECRYPT_PRESSED, payload: { id } };
  },
  publicPressed(id) {
    return { type: watcherActionTypes.PUBLIC_PRESSED, payload: { id } };
  },
  privatePressed(id) {
    return { type: watcherActionTypes.PRIVATE_PRESSED, payload: { id } };
  },
  deleteTriggerPressed(id) {
    return { type: watcherActionTypes.DELETE_TRIGGER_PRESSED, payload: { id } };
  },
  deleteItemPressed(id, sortKey) {
    return { type: watcherActionTypes.DELETE_ITEM_PRESSED, payload: { id, sortKey } };
  },
};
