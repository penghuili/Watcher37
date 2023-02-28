import sharedSelectors from '../../shared/react/store/sharedSelectors';

export const watcherSelectors = {
  getContent: state => state.watcher.content,
  getContentLink: state => state.watcher.contentLink,
  getContentError: state => state.watcher.contentError,
  getWatchers: state => state.watcher.watchers,
  getWatcher: (state, id) => watcherSelectors.getWatchers(state)?.find(w => w.sid === id),
  getDetails: state => state.watcher.details,
  getHistory: state => state.watcher.history,
  getStartKey: state => state.watcher.startKey,
  hasMore: state => state.watcher.hasMore,
  isLoading: state => state.watcher.isLoading,
  isLoadingHistory: state => state.watcher.isLoadingHistory,
  isChecking: state => state.watcher.isChecking,
  isDeleting: state => state.watcher.isDeleting,
  isEditingSchedule: state => state.watcher.isEditingSchedule,
  getFetchError: state => state.watcher.fetchError,
  isOwner: state => {
    const watcherOwner = watcherSelectors.getDetails(state)?.id;
    const userId = sharedSelectors.getAccount(state).userId;
    return !!watcherOwner && watcherOwner === userId;
  },
  getLastOpenTime: state => state.shared?.settings?.lastOpenTime,
  getTelegramId: state => state.shared?.settings?.telegramId,
};
