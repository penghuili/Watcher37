import { all, call, fork, takeLatest } from 'redux-saga/effects';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';

import { routeHelpers } from '../../lib/routeHelpers';
import { appActionTypes } from './appActions';

function* init() {
  yield call(LocalStorage.set, LocalStorageKeys.openTime, Date.now());
}

function* handleGoBack() {
  yield call(routeHelpers.goBack);
}

export function* appSagas() {
  yield fork(init);
  yield all([takeLatest(appActionTypes.GO_BACK, handleGoBack)]);
}
