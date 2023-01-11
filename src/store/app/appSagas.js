import { all, call, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../lib/routeHelpers';
import { appActionTypes } from './appActions';

function* handleGoBack() {
  yield call(routeHelpers.goBack);
}

export function* appSagas() {
  yield all([
    takeLatest(appActionTypes.GO_BACK, handleGoBack),
  ]);
}
