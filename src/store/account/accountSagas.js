import { all, call, put, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { showToast } from '../../lib/showToast';
import { authActionCreators } from '../auth/authActions';
import { accountActionCreators, accountActionTypes } from './accountActions';
import { addTelegramId, deleteAccount, fetchAccount } from './accountNetwork';

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

export function* accountSagas() {
  yield all([
    takeLatest(accountActionTypes.FETCH_REQUESTED, handleFetchRequested),
    takeLatest(accountActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(accountActionTypes.ADD_TELEGRAM_ID_PRESSED, handleAddTelegramIdPressed),
    takeLatest(accountActionTypes.NAV_TO_ACCOUNT_PRESSED, handleNavToAccountPressed),
  ]);
}
