import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { watcherReducer } from './watcher/watcherReducer';

export const reducers = combineReducers({
  shared: sharedReducer,
  watcher: watcherReducer,
});
