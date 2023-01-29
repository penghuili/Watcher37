import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { showToast } from '../../lib/showToast';
import { accountSelectors } from '../account/accountSelectors';
import { watcherActionCreators, watcherActionTypes } from './watcherActions';
import {
  checkWatcher,
  createWatcher,
  decryptWatcher,
  deleteItem,
  deleteTrigger,
  deleteWatcher,
  encryptWatcher,
  fetchPageContent,
  fetchWatcher,
  fetchWatcherHistory,
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

function* setWatchers(watchers) {
  const lastOpenTime = yield select(accountSelectors.getLastOpenTime);
  yield put(watcherActionCreators.setWatchers(watchers, lastOpenTime));
}

function* handleFetchWatchersRequested() {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(fetchWatchers);

  if (data) {
    yield call(setWatchers, data);
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleCreatePressed({ payload: { title, link, selector } }) {
  yield put(watcherActionCreators.isLoading(true));

  const botPublicKey = yield select(accountSelectors.getBotPublicKey);
  const { data } = yield call(createWatcher, { title, link, selector }, botPublicKey);

  if (data) {
    const watchers = yield select(watcherSelectors.getWatchers);
    yield call(setWatchers, [data, ...watchers]);
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
    yield call(
      setWatchers,
      watchers.filter(w => w.sortKey !== id)
    );
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
      })
    );
    if (newItem) {
      const history = yield select(watcherSelectors.getHistory);
      yield put(watcherActionCreators.setHistory([newItem, ...history]));
    }
  }

  const watchers = yield select(watcherSelectors.getWatchers);
  yield call(
    setWatchers,
    (watchers || []).map(w => (w.sortKey === newWatcher.sortKey ? newWatcher : w))
  );
}

function* handleEditPressed({
  payload: { id, title, selector, link, skipPersonalTelegram, telegramId, isPublic },
}) {
  yield put(watcherActionCreators.isLoading(true));

  const { encrypted } = yield select(watcherSelectors.getDetails);
  const { data } = yield call(updateWatcher, id, {
    encrypted,
    title,
    selector,
    link,
    skipPersonalTelegram,
    telegramId,
    isPublic,
  });

  if (data) {
    yield call(afterNewWatcher, data);
    if (telegramId) {
      yield call(showToast, 'Telegram channel is integrated!');
    } else if (telegramId === null) {
      yield call(showToast, 'Telegram channel is removed.');
    } else if (skipPersonalTelegram === true) {
      yield call(showToast, 'This watcher is muted.');
    } else if (skipPersonalTelegram === false) {
      yield call(showToast, 'This watcher will notify your personal Telegram account again.');
    } else {
      yield call(showToast, 'Watcher is updated!');
    }
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleFetchWatcherRequested({ payload: { id } }) {
  yield put(watcherActionCreators.setFetchError(''));
  yield put(watcherActionCreators.isLoading(true));
  yield put(watcherActionCreators.setDetails(null));
  yield put(watcherActionCreators.setHistory([], null, true));
  yield put(watcherActionCreators.fetchHistoryRequested(id));

  const { data, error } = yield call(fetchWatcher, id);

  if (data) {
    yield put(watcherActionCreators.setDetails(data));
  }

  if (error) {
    if (error.status === 401) {
      yield put(watcherActionCreators.setFetchError('You do not have access to this watcher.'));
    }

    if (error.status === 404) {
      yield put(watcherActionCreators.setFetchError('This watcher does not exist.'));
    }
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleFetchHistoryRequested({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const startKey = yield select(watcherSelectors.getStartKey);

  const { data, error } = yield call(fetchWatcherHistory, id, startKey);

  if (data) {
    const history = yield select(watcherSelectors.getHistory);
    yield put(
      watcherActionCreators.setHistory([...history, ...data.items], data.startKey, data.hasMore)
    );
  }

  if (error) {
    if (error.status === 401) {
      yield put(watcherActionCreators.setFetchError('You do not have access to this watcher.'));
    }

    if (error.status === 404) {
      yield put(watcherActionCreators.setFetchError('This watcher does not exist.'));
    }
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
    } else {
      yield call(showToast, 'Nothing new.', 'info');
    }
  }

  yield put(watcherActionCreators.isChecking(false));
}

function* handleScheduleTriggerPressed({ payload: { id, rate } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(scheduleTrigger, id, rate);

  if (data) {
    yield call(afterNewWatcher, data);
    yield call(showToast, 'Trigger is scheduled!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
  yield put(watcherActionCreators.isEditingSchedule(false));
}

function* handleEncryptPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const watcher = yield select(watcherSelectors.getDetails);
  const botPublicKey = yield select(accountSelectors.getBotPublicKey);
  const { data } = yield call(encryptWatcher, id, watcher, botPublicKey);

  if (data) {
    yield call(afterNewWatcher, data);
    yield call(showToast, 'Your watcher is now end-to-end encrypted!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDecryptPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const watcher = yield select(watcherSelectors.getDetails);

  const { data } = yield call(decryptWatcher, id, watcher);

  if (data) {
    yield call(afterNewWatcher, data);
    yield call(showToast, 'Your watcher is now decrypted!');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handlePublicPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const watcher = yield select(watcherSelectors.getDetails);
  if (watcher.encrypted) {
    yield call(decryptWatcher, id, watcher);
  }

  const { data } = yield call(updateWatcher, id, { encrypted: false, isPublic: true });

  if (data) {
    yield call(afterNewWatcher, data);
    yield call(
      showToast,
      'This watcher is now public, anyone can check it. (They cannot update it though.)'
    );
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handlePrivatePressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const watcher = yield select(watcherSelectors.getDetails);

  const { data } = yield call(updateWatcher, id, { encrypted: watcher.encrypted, isPublic: false });

  if (data) {
    yield call(afterNewWatcher, data);
    yield call(showToast, 'This watcher is now private, only you can check it.');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDeleteTriggerPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(deleteTrigger, id);

  if (data) {
    yield call(afterNewWatcher, data);
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
    const history = yield select(watcherSelectors.getHistory);
    yield put(watcherActionCreators.setHistory(history.filter(i => i.sortKey !== sortKey)));
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
    takeLatest(watcherActionTypes.FETCH_HISTORY_REQUESTED, handleFetchHistoryRequested),
    takeLatest(watcherActionTypes.CHECK_WATCHER_REQUESTED, handleCheckWatcherRequested),
    takeLatest(watcherActionTypes.SCHEDULE_TRIGGER_PRESSED, handleScheduleTriggerPressed),
    takeLatest(watcherActionTypes.ENCRYPT_PRESSED, handleEncryptPressed),
    takeLatest(watcherActionTypes.DECRYPT_PRESSED, handleDecryptPressed),
    takeLatest(watcherActionTypes.PUBLIC_PRESSED, handlePublicPressed),
    takeLatest(watcherActionTypes.PRIVATE_PRESSED, handlePrivatePressed),
    takeLatest(watcherActionTypes.DELETE_TRIGGER_PRESSED, handleDeleteTriggerPressed),
    takeLatest(watcherActionTypes.DELETE_ITEM_PRESSED, handleDeleteItemPressed),
  ]);
}
