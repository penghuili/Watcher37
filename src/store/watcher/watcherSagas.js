import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { watcherActionCreators, watcherActionTypes } from './watcherActions';
import {
  checkWatcher,
  createWatcher,
  deleteTrigger,
  deleteWatcher,
  fetchPageContent,
  fetchWatcher,
  fetchWatchers,
  scheduleTrigger,
  updateWatcher,
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

function* handleCreatePressed({ payload: { title, link, selector } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(createWatcher, { title, link, selector });

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
    yield call(routeHelpers.goBack);
    const watchers = yield select(watcherSelectors.getWatchers);
    yield put(watcherActionCreators.setWatchers(watchers.filter(w => w.sortKey !== id)));
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleNavToEditPressed({ payload: { id } }) {
  yield call(routeHelpers.navigate, `/watchers/${id}/edit`);
}

function* handleEditPressed({ payload: { id, title, selector, link } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(updateWatcher, id, { title, selector, link });

  if (data) {
    yield call(routeHelpers.goBack);
    const watchers = yield select(watcherSelectors.getWatchers);
    yield put(
      watcherActionCreators.setWatchers(
        watchers.map(w => (w.sortKey === id ? { ...w, ...data } : w))
      )
    );
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

function* handleCheckWatcherRequested({ payload: { id } }) {
  yield put(watcherActionCreators.isChecking(true));

  const { data } = yield call(checkWatcher, id);

  if (data?.watcher) {
    const watcher = yield select(watcherSelectors.getDetails);
    yield put(
      watcherActionCreators.setDetails({
        ...watcher,
        ...data.watcher,
        history: data?.item ? [data.item, ...watcher.history] : watcher.history,
      })
    );
  }

  yield put(watcherActionCreators.isChecking(false));
}

function* handleScheduleTriggerPressed({ payload: { id, rate } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(scheduleTrigger, id, rate);

  if (data) {
    yield put(watcherActionCreators.setDetails(data));
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDeleteTriggerPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(deleteTrigger, id);

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
    takeLatest(watcherActionTypes.NAV_TO_EDIT_PRESSED, handleNavToEditPressed),
    takeLatest(watcherActionTypes.EDIT_PRESSED, handleEditPressed),
    takeLatest(watcherActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(watcherActionTypes.FETCH_WATCHER_REQUESTED, handleFetchWatcherRequested),
    takeLatest(watcherActionTypes.CHECK_WATCHER_REQUESTED, handleCheckWatcherRequested),
    takeLatest(watcherActionTypes.SCHEDULE_TRIGGER_PRESSED, handleScheduleTriggerPressed),
    takeLatest(watcherActionTypes.DELETE_TRIGGER_PRESSED, handleDeleteTriggerPressed),
  ]);
}
