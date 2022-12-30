import { combineReducers } from 'redux';

import { accountReducer } from './account/accountReducer';
import { appReducer } from './app/appReducer';
import { authReducer } from './auth/authReducer';

export const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  account: accountReducer,
});
