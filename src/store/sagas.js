import { all } from 'redux-saga/effects';

import { accountSagas } from './account/accountSagas';
import { appSagas } from './app/appSagas';
import { authSagas } from './auth/authSagas';

export function* sagas() {
  yield all([appSagas(), authSagas(), accountSagas()]);
}
