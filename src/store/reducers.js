import { combineReducers } from 'redux';

import { accountReducer } from './account/accountReducer';
import { appReducer } from './app/appReducer';
import { authReducer } from './auth/authReducer';
import { watcherReducer } from './watcher/watcherReducer';

export const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  account: accountReducer,
  watcher: watcherReducer,
});
