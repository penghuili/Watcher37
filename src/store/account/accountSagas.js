import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { showToast } from '../../lib/showToast';
import { authActionCreators, authActionTypes } from '../auth/authActions';
import { accountActionCreators, accountActionTypes } from './accountActions';
import { addTelegramId, changePassword, deleteAccount, fetchAccount } from './accountNetwork';
import { accountSelectors } from './accountSelectors';

function* handleIsLoggedIn({ payload: { loggedIn } }) {
  console.log(loggedIn)
  if (loggedIn) {
    yield put(accountActionCreators.fetchRequested());
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

function* handleDeletePressed() {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(deleteAccount);

  if (data) {
    yield put(authActionCreators.logOutPressed());
    yield call(showToast, 'Your account is deleted.');
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleAddTelegramIdPressed({ payload: { telegramId } }) {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(addTelegramId, telegramId);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
    yield call(
      showToast,
      'Telegram id is added, you will get notification when there is new content.'
    );
  } else {
    yield call(showToast, 'Something went wrong, please try again.', 'error');
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleNavToAccountPressed() {
  yield call(routeHelpers.navigate, '/account');
}

function* handleChangePasswordPressed({ payload: { currentPassword, newPassword } }) {
  yield put(accountActionCreators.isLoading(true));

  const { username } = yield select(accountSelectors.getAccount);
  const { data } = yield call(changePassword, username, currentPassword, newPassword);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
    yield call(showToast, 'Your password is changed! Please login again.');
    yield put(authActionCreators.logOutPressed());
  } else {
    yield call(showToast, 'Something went wrong, your current password may be wrong.', 'error');
  }

  yield put(accountActionCreators.isLoading(false));
}

export function* accountSagas() {
  yield all([
    takeLatest(authActionTypes.IS_LOGGED_IN, handleIsLoggedIn),
    takeLatest(accountActionTypes.FETCH_REQUESTED, handleFetchRequested),
    takeLatest(accountActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(accountActionTypes.ADD_TELEGRAM_ID_PRESSED, handleAddTelegramIdPressed),
    takeLatest(accountActionTypes.NAV_TO_ACCOUNT_PRESSED, handleNavToAccountPressed),
    takeLatest(accountActionTypes.CHANGE_PASSWORD_PRESSED, handleChangePasswordPressed),
  ]);
}
