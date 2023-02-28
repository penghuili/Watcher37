import { all, call, fork, put, select, takeLatest, takeLeading } from 'redux-saga/effects';

import { LocalStorageKeys } from '../../lib/constants';
import apps from '../../shared/js/apps';
import { LocalStorage } from '../../shared/js/LocalStorage';
import { routeHelpers } from '../../shared/react/routeHelpers';
import { sharedActionCreators, sharedActionTypes } from '../../shared/react/store/sharedActions';
import { toastTypes } from '../../shared/react/store/sharedReducer';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
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
  updateSettings,
  updateWatcher,
} from './watcherNetwork';
import { watcherSelectors } from './watcherSelectors';

function* init() {
  const openTime = yield call(LocalStorage.get, LocalStorageKeys.openTime);
  if (openTime) {
    yield call(LocalStorage.set, LocalStorageKeys.lastOpenTime, openTime);
  }

  yield call(LocalStorage.set, LocalStorageKeys.openTime, Date.now());
}

function* handleIsLoggedIn({ payload: { loggedIn } }) {
  if (loggedIn) {
    const lastOpenTime = yield call(LocalStorage.get, LocalStorageKeys.lastOpenTime);
    if (lastOpenTime) {
      yield put(watcherActionCreators.updateSettingsRequested(lastOpenTime));
    } else {
      yield put(sharedActionCreators.fetchSettingsRequested(apps.watcher37.name));
    }
  }
}

function* handleFetchContentPressed({ payload: { link, selector } }) {
  yield put(watcherActionCreators.isLoading(true));
  yield put(watcherActionCreators.setContent(null, null));
  yield put(watcherActionCreators.setContentError(null));

  const { data } = yield call(fetchPageContent, link, selector);

  if (data?.content) {
    yield put(watcherActionCreators.setContent(data.content, data.contentLink));
  } else {
    yield put(
      watcherActionCreators.setContentError(
        'No content. Either the selector is not correct, or the website does not support crawling.'
      )
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleUpdateSettingsRequested({ payload: { lastOpenTime } }) {
  yield put(sharedActionCreators.isLoadingSettings(true));

  const { data } = yield call(updateSettings, { lastOpenTime });

  if (data) {
    yield put(sharedActionCreators.setSettings(data));
  }

  yield put(sharedActionCreators.isLoadingSettings(false));
}

function* handleAddTelegramIdPressed({ payload: { telegramId } }) {
  yield put(sharedActionCreators.isLoadingSettings(true));

  const { data } = yield call(updateSettings, { telegramId });

  if (data) {
    yield put(sharedActionCreators.setSettings(data));
    yield put(
      sharedActionCreators.setToast(
        telegramId
          ? 'Telegram id is added, you will get notification when there is new content.'
          : 'You removed Telegram integraion.'
      )
    );
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(sharedActionCreators.isLoadingSettings(false));
}

function* setWatchers(watchers) {
  const lastOpenTime = yield select(watcherSelectors.getLastOpenTime);
  yield put(watcherActionCreators.setWatchers(watchers, lastOpenTime));
}

function* handleFetchWatchersRequested({ payload: { isHardRefresh } }) {
  const watchers = yield select(watcherSelectors.getWatchers);
  if (!isHardRefresh && watchers?.length) {
    return;
  }

  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(fetchWatchers);

  if (data) {
    yield call(setWatchers, data);
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleCreatePressed({ payload: { title, link, selectors } }) {
  yield put(watcherActionCreators.isLoading(true));

  const botPublicKey = yield select(sharedSelectors.getBotPublicKey);
  const { data } = yield call(createWatcher, { title, link, selectors }, botPublicKey);

  if (data) {
    const watchers = yield select(watcherSelectors.getWatchers);
    yield call(setWatchers, [data, ...watchers]);
    yield call(routeHelpers.replace, `/w/${data.sid}`);
    yield put(sharedActionCreators.setToast('Watcher is created!'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
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
      watchers.filter(w => w.sid !== id)
    );
    yield put(sharedActionCreators.setToast('Watcher is delete!'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* afterUpdateWatcher(newWatcher, newItem) {
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
    (watchers || []).map(w => (w.sid === newWatcher.sid ? newWatcher : w))
  );
}

function* handleEditPressed({
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
}) {
  yield put(watcherActionCreators.isLoading(true));

  const { encrypted } = yield select(watcherSelectors.getDetails);
  const botPublicKey = yield select(sharedSelectors.getBotPublicKey);

  const { data } = yield call(
    updateWatcher,
    id,
    {
      encrypted: !!encrypted,
      title,
      selectors,
      link,
      skipPersonalTelegram,
      telegramId,
      isPublic,
      noDuplication,
    },
    botPublicKey
  );

  if (data) {
    yield call(afterUpdateWatcher, data);
    let message;
    if (telegramId) {
      message = 'Telegram channel is integrated!';
    } else if (telegramId === null) {
      message = 'Telegram channel is removed.';
    } else if (skipPersonalTelegram === true) {
      message = 'This watcher is muted.';
    } else if (skipPersonalTelegram === false) {
      message = 'This watcher will notify your personal Telegram account again.';
    } else {
      message = 'Watcher is updated!';
    }

    yield put(sharedActionCreators.setToast(message));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleFetchWatcherRequested({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  yield put(watcherActionCreators.setFetchError(''));
  yield put(watcherActionCreators.setDetails(null));
  yield put(watcherActionCreators.setHistory([], null, true));

  const { data, error } = yield call(fetchWatcher, id);

  if (data) {
    yield put(watcherActionCreators.setDetails(data));
    yield put(watcherActionCreators.fetchHistoryRequested(id));
  }

  if (error) {
    if (error.status === 401) {
      yield put(watcherActionCreators.setFetchError('You need to login to view this watcher.'));
    }

    if (error.status === 403) {
      yield put(watcherActionCreators.setFetchError('You do not have access to this watcher.'));
    }

    if (error.status === 404) {
      yield put(watcherActionCreators.setFetchError('This watcher does not exist.'));
    }
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleFetchHistoryRequested({ payload: { id } }) {
  yield put(watcherActionCreators.isLoadingHistory(true));

  const startKey = yield select(watcherSelectors.getStartKey);
  const watcher = yield select(watcherSelectors.getDetails);
  const { data, error } = yield call(fetchWatcherHistory, id, startKey, watcher);

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

  yield put(watcherActionCreators.isLoadingHistory(false));
}

function* handleCheckWatcherRequested({ payload: { id } }) {
  yield put(watcherActionCreators.isChecking(true));

  const { data } = yield call(checkWatcher, id);

  if (data?.watcher) {
    yield call(afterUpdateWatcher, data.watcher, data?.item);

    if (data?.item) {
      yield put(sharedActionCreators.setToast('New content!'));
    } else {
      yield put(sharedActionCreators.setToast('Nothing new.', toastTypes.info));
    }
  }

  yield put(watcherActionCreators.isChecking(false));
}

function* handleScheduleTriggerPressed({ payload: { id, rate } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(scheduleTrigger, id, rate);

  if (data) {
    yield call(afterUpdateWatcher, data);
    yield put(sharedActionCreators.setToast('Trigger is scheduled!'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
  yield put(watcherActionCreators.isEditingSchedule(false));
}

function* handleEncryptPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const watcher = yield select(watcherSelectors.getDetails);
  const botPublicKey = yield select(sharedSelectors.getBotPublicKey);

  const { data } = yield call(encryptWatcher, id, watcher, botPublicKey);

  if (data) {
    yield call(afterUpdateWatcher, data);
    yield put(sharedActionCreators.setToast('Your watcher is now end-to-end encrypted!'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDecryptPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const watcher = yield select(watcherSelectors.getDetails);

  const { data } = yield call(decryptWatcher, id, watcher);

  if (data) {
    yield call(afterUpdateWatcher, data);
    yield put(sharedActionCreators.setToast('Your watcher is now decrypted.'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handlePublicPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  let watcher = yield select(watcherSelectors.getDetails);
  if (watcher.encrypted) {
    const { data: decrypted } = yield call(decryptWatcher, id, watcher);

    if (!decrypted) {
      yield put(
        sharedActionCreators.setToast(
          'Something went wrong, please try again.',
          toastTypes.critical
        )
      );
      return;
    }

    watcher = decrypted;
  }

  const { data } = yield call(updateWatcher, id, {
    encrypted: watcher.encrypted,
    isPublic: true,
  });

  if (data) {
    yield call(afterUpdateWatcher, data);
    yield put(
      sharedActionCreators.setToast(
        'This watcher is now public, anyone can check it. (They cannot update it though.)'
      )
    );
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handlePrivatePressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));
  const watcher = yield select(watcherSelectors.getDetails);

  const { data } = yield call(updateWatcher, id, {
    encrypted: !!watcher.encrypted,
    isPublic: false,
  });

  if (data) {
    yield call(afterUpdateWatcher, data);
    yield put(sharedActionCreators.setToast('This watcher is now private, only you can check it.'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDeleteTriggerPressed({ payload: { id } }) {
  yield put(watcherActionCreators.isLoading(true));

  const { data } = yield call(deleteTrigger, id);

  if (data) {
    yield call(afterUpdateWatcher, data);
    yield put(sharedActionCreators.setToast('Trigger is deleted!'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isLoading(false));
}

function* handleDeleteItemPressed({ payload: { id, sortKey } }) {
  yield put(watcherActionCreators.isDeleting(true));

  const { data } = yield call(deleteItem, id, sortKey);

  if (data) {
    const history = yield select(watcherSelectors.getHistory);
    yield put(watcherActionCreators.setHistory(history.filter(i => i.sortKey !== sortKey)));
    yield put(sharedActionCreators.setToast('Deleted!'));
  } else {
    yield put(
      sharedActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(watcherActionCreators.isDeleting(false));
}

export function* watcherSagas() {
  yield fork(init);

  yield all([
    takeLatest(sharedActionTypes.IS_LOGGED_IN, handleIsLoggedIn),
    takeLatest(watcherActionTypes.FETCH_CONTENT_PRESSED, handleFetchContentPressed),
    takeLeading(watcherActionTypes.FETCH_WATCHERS_REQUESTED, handleFetchWatchersRequested),
    takeLatest(watcherActionTypes.UPDATE_SETTINGS_REQUESTED, handleUpdateSettingsRequested),
    takeLatest(watcherActionTypes.ADD_TELEGRAM_ID_PRESSED, handleAddTelegramIdPressed),
    takeLatest(watcherActionTypes.CREATE_PRESSED, handleCreatePressed),
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
