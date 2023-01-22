export const watcherActionTypes = {
  FETCH_CONTENT_PRESSED: 'watcher/FETCH_CONTENT_PRESSED',
  SET_CONTENT: 'watcher/SET_CONTENT',
  IS_LOADING: 'watcher/IS_LOADING',
  IS_CHECKING: 'watcher/IS_CHECKING',
  IS_DELETING: 'watcher/IS_DELETING',
  IS_EDITING_SCHEDULE: 'watcher/IS_EDITING_SCHEDULE',
  SET_WATCHERS: 'watcher/SET_WATCHERS',
  SET_DETAILS: 'watcher/SET_DETAILS',

  FETCH_WATCHERS_REQUESTED: 'watcher/FETCH_WATCHERS_REQUESTED',
  CREATE_PRESSED: 'watcher/CREATE_PRESSED',
  NAV_TO_EDIT_PRESSED: 'watcher/NAV_TO_EDIT_PRESSED',
  EDIT_PRESSED: 'watcher/EDIT_PRESSED',
  DELETE_PRESSED: 'watcher/DELETE_PRESSED',
  FETCH_WATCHER_REQUESTED: 'watcher/FETCH_WATCHER_REQUESTED',
  CHECK_WATCHER_REQUESTED: 'watcher/CHECK_WATCHER_REQUESTED',
  SCHEDULE_TRIGGER_PRESSED: 'watcher/SCHEDULE_TRIGGER_PRESSED',
  DELETE_TRIGGER_PRESSED: 'watcher/DELETE_TRIGGER_PRESSED',
  DELETE_ITEM_PRESSED: 'watcher/DELETE_ITEM_PRESSED',
};

export const watcherActionCreators = {
  fetchContentPressed(link, selector) {
    return { type: watcherActionTypes.FETCH_CONTENT_PRESSED, payload: { link, selector } };
  },
  setContent(content) {
    return { type: watcherActionTypes.SET_CONTENT, payload: { content } };
  },
  isLoading(loading) {
    return { type: watcherActionTypes.IS_LOADING, payload: { loading } };
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
  fetchWatchersRequested() {
    return { type: watcherActionTypes.FETCH_WATCHERS_REQUESTED };
  },
  createPressed({ title, link, selector }) {
    return { type: watcherActionTypes.CREATE_PRESSED, payload: { title, link, selector } };
  },
  navToEditPressed(id) {
    return { type: watcherActionTypes.NAV_TO_EDIT_PRESSED, payload: { id } };
  },
  editPressed(
    id,
    { title, selector, link, skipPersonalTelegram, telegramId, telegramTitle, telegramLink }
  ) {
    return {
      type: watcherActionTypes.EDIT_PRESSED,
      payload: {
        id,
        title,
        selector,
        link,
        skipPersonalTelegram,
        telegramId,
        telegramTitle,
        telegramLink,
      },
    };
  },
  deletePressed(id) {
    return { type: watcherActionTypes.DELETE_PRESSED, payload: { id } };
  },
  fetchWatcherRequested(id) {
    return { type: watcherActionTypes.FETCH_WATCHER_REQUESTED, payload: { id } };
  },
  checkWatchersRequested(id) {
    return { type: watcherActionTypes.CHECK_WATCHER_REQUESTED, payload: { id } };
  },
  scheduleTriggerPressed(id, rate) {
    return { type: watcherActionTypes.SCHEDULE_TRIGGER_PRESSED, payload: { id, rate } };
  },
  deleteTriggerPressed(id) {
    return { type: watcherActionTypes.DELETE_TRIGGER_PRESSED, payload: { id } };
  },
  deleteItemPressed(id, sortKey) {
    return { type: watcherActionTypes.DELETE_ITEM_PRESSED, payload: { id, sortKey } };
  },
};
