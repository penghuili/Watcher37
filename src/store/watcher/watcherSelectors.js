import { accountSelectors } from '../account/accountSelectors';

export const watcherSelectors = {
  getContent: state => state.watcher.content,
  getWatchers: state => state.watcher.watchers,
  getWatcher: (state, id) => watcherSelectors.getWatchers(state)?.find(w => w.sid === id),
  getDetails: state => state.watcher.details,
  getHistory: state => state.watcher.history,
  getStartKey: state => state.watcher.startKey,
  hasMore: state => state.watcher.hasMore,
  isLoading: state => state.watcher.isLoading,
  isChecking: state => state.watcher.isChecking,
  isDeleting: state => state.watcher.isDeleting,
  isEditingSchedule: state => state.watcher.isEditingSchedule,
  getFetchError: state => state.watcher.fetchError,
  isOwner: state => {
    const watcherOwner = watcherSelectors.getDetails(state)?.id;
    const userId = accountSelectors.getAccount(state).userId;
    return !!watcherOwner && watcherOwner === userId;
  },
};
