import { all } from 'redux-saga/effects';

import { sharedSagas } from '../shared/react/store/sharedSaga';
import { watcherSagas } from './watcher/watcherSagas';

export function* sagas() {
  yield all([sharedSagas(), watcherSagas()]);
}
