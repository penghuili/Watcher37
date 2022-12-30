import { all, call, put, takeLatest } from 'redux-saga/effects';

import { authActionCreators } from '../auth/authActions';
import { accountActionCreators, accountActionTypes } from './accountActions';
import { deleteAccount, fetchAccount } from './accountNetwork';

function* handleViewEntered() {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(fetchAccount);

  if (data) {
    yield put(accountActionCreators.setUserData(data.userId, data.username, data.createdAt));
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

export function* accountSagas() {
  yield all([
    takeLatest(accountActionTypes.VIEW_ENTERED, handleViewEntered),
    takeLatest(accountActionTypes.DELETE_PRESSED, handleDeletePressed),
  ]);
}
