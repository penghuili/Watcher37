import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { watcherActionCreators, watcherActionTypes } from './watcherActions';
import {
  createWatcher,
  deleteWatcher,
  fetchPageContent,
  fetchWatcher,
  fetchWatchers,
} from './watcherNetwork';
import { watcherSelectors } from './watcherSelectors';

function* handleFetchContentPressed({ payload: { link, selector } }) {
  yield put(watcherActionCreators.isLoading(true));
  yield put(watcherActionCreators.setContent(null));

  const { data } = yield call(fetchPageContent, link, selector);

  if (data) {
    yield put(watcherActionCreators.setContent(data.content));
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleFetchWatchersRequested() {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(fetchWatchers);

  if (data) {
    yield put(watcherActionCreators.setWatchers(data));
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleCreatePressed({ payload: { link, selector } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(createWatcher, { link, selector });

  if (data) {
    const watchers = yield select(watcherSelectors.getWatchers);
    yield put(watcherActionCreators.setWatchers([data, ...watchers]));
    yield call(routeHelpers.goBack);
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDeletePressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(deleteWatcher, id);

  if (data) {
    const watchers = yield select(watcherSelectors.getWatchers);
    yield put(watcherActionCreators.setWatchers(watchers.filter(w => w.sortKey !== id)));
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleFetchWatcherRequested({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  yield put(watcherActionCreators.setDetails(null));

  const { data } = yield call(fetchWatcher, id);

  if (data) {
    yield put(watcherActionCreators.setDetails(data));
  }

  yield put(watcherActionCreators.isLoading(false));
}

export function* watcherSagas() {
  yield all([
    takeLatest(watcherActionTypes.FETCH_CONTENT_PRESSED, handleFetchContentPressed),
    takeLatest(watcherActionTypes.FETCH_WATCHERS_REQUESTED, handleFetchWatchersRequested),
    takeLatest(watcherActionTypes.CREATE_PRESSED, handleCreatePressed),
    takeLatest(watcherActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(watcherActionTypes.FETCH_WATCHER_REQUESTED, handleFetchWatcherRequested),
  ]);
}
