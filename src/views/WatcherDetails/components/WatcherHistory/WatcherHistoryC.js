import { connect } from 'react-redux';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import { watcherSelectors } from '../../../../store/watcher/watcherSelectors';
import WatcherHistory from './WatcherHistory';

const mapStateToProps = state => ({
  history: watcherSelectors.getHistory(state),
  hasMore: watcherSelectors.hasMore(state),
  isLoadingHistory: watcherSelectors.isLoadingHistory(state),
  isChecking: watcherSelectors.isChecking(state),
  isDeleting: watcherSelectors.isDeleting(state),
});

const mapDispatchToProps = {
  onCheckWatcher: watcherActionCreators.checkWatchersRequested,
  onFetchHistory: watcherActionCreators.fetchHistoryRequested,
  onDeleteItem: watcherActionCreators.deleteItemPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherHistory);
