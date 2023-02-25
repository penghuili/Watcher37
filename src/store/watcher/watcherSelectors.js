import { formatDate } from '../../shared/js/date';
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
  isLoadingSettings: state => state.watcher.isLoadingSettings,
  getLastOpenTime: state => state.watcher.lastOpenTime,
  isAccountValid: state => {
    const expiresAt = watcherSelectors.getExpiresAt(state);
    const today = formatDate(new Date());
    return !!expiresAt && expiresAt >= today;
  },
  getExpiresAt: state => state.watcher.expiresAt,
  tried: state => state.watcher.tried,
  getPayError: state => state.watcher.payError,
  getTelegramId: state => state.watcher.telegramId,
};
