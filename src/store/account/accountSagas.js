import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { errorCodes } from '../../lib/errorCodes';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';
import { appActionCreators } from '../app/appActions';
import { toastTypes } from '../app/appReducer';
import { authActionCreators, authActionTypes } from '../auth/authActions';
import { accountActionCreators, accountActionTypes } from './accountActions';
import {
  addTelegramId,
  changePassword,
  deleteAccount,
  fetchAccount,
  fetchSettings,
  pay,
  tryApp,
  updateSettings,
} from './accountNetwork';
import { accountSelectors } from './accountSelectors';

function* handleIsLoggedIn({ payload: { loggedIn } }) {
  if (loggedIn) {
    yield put(accountActionCreators.fetchRequested());

    const lastOpenTime = yield call(LocalStorage.get, LocalStorageKeys.lastOpenTime);
    if (lastOpenTime) {
      yield put(accountActionCreators.updateSettingsRequested(lastOpenTime));
    } else {
      yield put(accountActionCreators.fetchSettingsRequested());
    }
  }
}

function* handleFetchRequested() {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(fetchAccount);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleFetchSettingsRequested() {
  yield put(accountActionCreators.isLoadingSettings(true));

  const { data } = yield call(fetchSettings);

  if (data) {
    yield put(accountActionCreators.setSettings(data));
  }

  yield put(accountActionCreators.isLoadingSettings(false));
}

function* handleUpdateSettingsRequested({ payload: { lastOpenTime } }) {
  yield put(accountActionCreators.isLoadingSettings(true));

  const { data } = yield call(updateSettings, lastOpenTime);

  if (data) {
    yield put(accountActionCreators.setSettings(data));
  }

  yield put(accountActionCreators.isLoadingSettings(false));
}

function* handleTryPressed() {
  yield put(accountActionCreators.isLoadingSettings(true));

  const { data, error } = yield call(tryApp);

  if (data) {
    yield put(accountActionCreators.setSettings(data));
    yield put(
      appActionCreators.setToast(
        `Free start trial start! Your account is valid until ${data.expiresAt}.`
      )
    );
  } else {
    if (error?.errorCode === errorCodes.PAGE_WATCHER_TRIED) {
      yield put(appActionCreators.setToast('You have already tried :)', toastTypes.critical));
    }
  }

  yield put(accountActionCreators.isLoadingSettings(false));
}

function* handlePayPressed({ payload: { code } }) {
  yield put(accountActionCreators.isLoadingSettings(true));
  yield put(accountActionCreators.setPayError(null));

  const { data, error } = yield call(pay, code);

  if (data) {
    yield put(accountActionCreators.setSettings(data));
    yield put(appActionCreators.setToast(`Nice! Your account is valid until ${data.expiresAt}.`));
  } else {
    if (errorCodes.NOT_FOUND === error?.errorCode) {
      yield put(accountActionCreators.setPayError('Invalid code.'));
    } else if (error?.errorCode === errorCodes.PAGE_WATCHER_INVALID_TICKET) {
      yield put(accountActionCreators.setPayError('This code is already used.'));
    } else {
      yield put(accountActionCreators.setPayError('Something went wrong, please try again.'));
    }
  }

  yield put(accountActionCreators.isLoadingSettings(false));
}

function* handleDeletePressed() {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(deleteAccount);

  if (data) {
    yield put(authActionCreators.logOutPressed());
    yield put(appActionCreators.setToast('Your account is deleted.'));
  } else {
    yield put(
      appActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleAddTelegramIdPressed({ payload: { telegramId } }) {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(addTelegramId, telegramId);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
    yield put(
      appActionCreators.setToast(
        telegramId
          ? 'Telegram id is added, you will get notification when there is new content.'
          : 'You removed Telegram integraion.'
      )
    );
  } else {
    yield put(
      appActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleChangePasswordPressed({ payload: { currentPassword, newPassword } }) {
  yield put(accountActionCreators.isLoading(true));

  const { username } = yield select(accountSelectors.getAccount);
  const { data } = yield call(changePassword, username, currentPassword, newPassword);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
    yield put(appActionCreators.setToast('Your password is changed! Please login again.'));
    yield put(authActionCreators.logOutPressed());
  } else {
    yield put(
      appActionCreators.setToast(
        'Something went wrong, your current password may be wrong.',
        toastTypes.critical
      )
    );
  }

  yield put(accountActionCreators.isLoading(false));
}

export function* accountSagas() {
  yield all([
    takeLatest(authActionTypes.IS_LOGGED_IN, handleIsLoggedIn),
    takeLatest(accountActionTypes.FETCH_REQUESTED, handleFetchRequested),
    takeLatest(accountActionTypes.FETCH_SETTINGS_REQUESTED, handleFetchSettingsRequested),
    takeLatest(accountActionTypes.UPDATE_SETTINGS_REQUESTED, handleUpdateSettingsRequested),
    takeLatest(accountActionTypes.TRY_PRESSED, handleTryPressed),
    takeLatest(accountActionTypes.PAY_PRESSED, handlePayPressed),
    takeLatest(accountActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(accountActionTypes.ADD_TELEGRAM_ID_PRESSED, handleAddTelegramIdPressed),
    takeLatest(accountActionTypes.CHANGE_PASSWORD_PRESSED, handleChangePasswordPressed),
  ]);
}
