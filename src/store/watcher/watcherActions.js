export const watcherActionTypes = {
  FETCH_CONTENT_PRESSED: 'watcher/FETCH_CONTENT_PRESSED',
  SET_CONTENT: 'watcher/SET_CONTENT',
  IS_LOADING: 'watcher/IS_LOADING',
  SET_WATCHERS: 'watcher/SET_WATCHERS',
  SET_DETAILS: 'watcher/SET_DETAILS',

  FETCH_WATCHERS_REQUESTED: 'watcher/FETCH_WATCHERS_REQUESTED',
  CREATE_PRESSED: 'watcher/CREATE_PRESSED',
  DELETE_PRESSED: 'watcher/DELETE_PRESSED',
  FETCH_WATCHER_REQUESTED: 'watcher/FETCH_WATCHER_REQUESTED',
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
  setWatchers(watchers) {
    return { type: watcherActionTypes.SET_WATCHERS, payload: { watchers } };
  },
  setDetails(details) {
    return { type: watcherActionTypes.SET_DETAILS, payload: { details } };
  },
  fetchWatchersRequested() {
    return { type: watcherActionTypes.FETCH_WATCHERS_REQUESTED };
  },
  createPressed({ link, selector }) {
    return { type: watcherActionTypes.CREATE_PRESSED, payload: { link, selector } };
  },
  deletePressed(id) {
    return { type: watcherActionTypes.DELETE_PRESSED, payload: { id } };
  },
  fetchWatcherRequested(id) {
    return { type: watcherActionTypes.FETCH_WATCHER_REQUESTED, payload: { id } };
  },
};
