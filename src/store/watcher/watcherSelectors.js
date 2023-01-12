export const watcherSelectors = {
  getContent: state => state.watcher.content,
  getWatchers: state => state.watcher.watchers,
  getWatcher: (state, id) => watcherSelectors.getWatchers(state)?.find(w => w.sortKey === id),
  getDetails: state => state.watcher.details,
  isLoading: state => state.watcher.isLoading,
  isChecking: state => state.watcher.isChecking,
  isDeleting: state => state.watcher.isDeleting,
};
