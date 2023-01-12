import { all, call, put, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { authActionCreators } from '../auth/authActions';
import { accountActionCreators, accountActionTypes } from './accountActions';
import { addTelegramId, deleteAccount, fetchAccount } from './accountNetwork';

function* handleViewEntered() {
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
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleAddTelegramIdPressed({ payload: { telegramId } }) {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(addTelegramId, telegramId);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleNavToAccountPressed() {
  yield call(routeHelpers.navigate, '/account');
}

export function* accountSagas() {
  yield all([
    takeLatest(accountActionTypes.FETCH_REQUESTED, handleViewEntered),
    takeLatest(accountActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(accountActionTypes.ADD_TELEGRAM_ID_PRESSED, handleAddTelegramIdPressed),
    takeLatest(accountActionTypes.NAV_TO_ACCOUNT_PRESSED, handleNavToAccountPressed),
  ]);
}
