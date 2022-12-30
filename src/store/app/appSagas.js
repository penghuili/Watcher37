import { all, takeLatest } from 'redux-saga/effects';

import { appActionTypes } from './appActions';

function* handleReset() {}

export function* appSagas() {
  yield all([takeLatest(appActionTypes.RESET, handleReset)]);
}
