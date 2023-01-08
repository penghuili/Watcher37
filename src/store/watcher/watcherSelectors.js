export const watcherSelectors = {
  getContent: state => state.watcher.content,
  getWatchers: state => state.watcher.watchers,
  getDetails: state => state.watcher.details,
  isLoading: state => state.watcher.isLoading,
};
