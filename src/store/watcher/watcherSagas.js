import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { showToast } from '../../lib/showToast';
import { watcherActionCreators, watcherActionTypes } from './watcherActions';
import {
  checkWatcher,
  createWatcher,
  deleteItem,
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

  if (data?.content) {
    yield put(watcherActionCreators.setContent(data.content));
  } else {
    yield call(
      showToast,
      'No content. Either the selector is not correct, or the website does not support crawling.',
      'error'
    );
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
    yield call(showToast, 'Watcher is created!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
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
    yield call(showToast, 'Watcher is delete!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleNavToEditPressed({ payload: { id } }) {
  yield call(routeHelpers.navigate, `/w/${id}/edit`);
}

function* afterNewWatcher(newWatcher, newItem) {
  if (!newWatcher) {
    return;
  }

  const watcher = yield select(watcherSelectors.getDetails);
  if (watcher) {
    yield put(
      watcherActionCreators.setDetails({
        ...watcher,
        ...newWatcher,
        history: newItem ? [newItem, ...watcher.history] : watcher.history,
      })
    );
  }

  const watchers = yield select(watcherSelectors.getWatchers);
  yield put(
    watcherActionCreators.setWatchers(
      (watchers || []).map(w => (w.sortKey === newWatcher.sortKey ? newWatcher : w))
    )
  );
}

function* handleEditPressed({
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
}) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(updateWatcher, id, {
    title,
    selector,
    link,
    skipPersonalTelegram,
    telegramId,
    telegramTitle,
    telegramLink,
  });

  if (data) {
    yield call(afterNewWatcher, data);
    yield call(showToast, 'Watcher is updated!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
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
    yield call(afterNewWatcher, data.watcher, data?.item);

    if (data?.item) {
      yield call(showToast, 'New content!');
    }
  }

  yield put(watcherActionCreators.isChecking(false));
}

function* handleScheduleTriggerPressed({ payload: { id, rate } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(scheduleTrigger, id, rate);

  if (data) {
    yield put(watcherActionCreators.setDetails(data));
    yield call(showToast, 'Trigger is scheduled!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDeleteTriggerPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(deleteTrigger, id);

  if (data) {
    yield put(watcherActionCreators.setDetails(data));
    yield call(showToast, 'Trigger is deleted!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDeleteItemPressed({ payload: { id, sortKey } }) {
  yield put(watcherActionCreators.isDeleting(true));

  const { data } = yield call(deleteItem, id, sortKey);

  if (data) {
    const watcher = yield select(watcherSelectors.getDetails);
    yield put(
      watcherActionCreators.setDetails({
        ...watcher,
        history: watcher.history.filter(i => i.sortKey !== sortKey),
      })
    );
    yield call(showToast, 'Deleted!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isDeleting(false));
}

export function* watcherSagas() {
  yield all([
    takeLatest(watcherActionTypes.FETCH_CONTENT_PRESSED, handleFetchContentPressed),
    takeLeading(watcherActionTypes.FETCH_WATCHERS_REQUESTED, handleFetchWatchersRequested),
    takeLatest(watcherActionTypes.CREATE_PRESSED, handleCreatePressed),
    takeLatest(watcherActionTypes.NAV_TO_EDIT_PRESSED, handleNavToEditPressed),
    takeLatest(watcherActionTypes.EDIT_PRESSED, handleEditPressed),
    takeLatest(watcherActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(watcherActionTypes.FETCH_WATCHER_REQUESTED, handleFetchWatcherRequested),
    takeLatest(watcherActionTypes.CHECK_WATCHER_REQUESTED, handleCheckWatcherRequested),
    takeLatest(watcherActionTypes.SCHEDULE_TRIGGER_PRESSED, handleScheduleTriggerPressed),
    takeLatest(watcherActionTypes.DELETE_TRIGGER_PRESSED, handleDeleteTriggerPressed),
    takeLatest(watcherActionTypes.DELETE_ITEM_PRESSED, handleDeleteItemPressed),
  ]);
}
