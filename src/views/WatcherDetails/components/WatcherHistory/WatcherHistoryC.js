import { connect } from 'react-redux';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import { watcherSelectors } from '../../../../store/watcher/watcherSelectors';
import WatcherHistory from './WatcherHistory';

const mapStateToProps = state => ({
  isChecking: watcherSelectors.isChecking(state),
  isDeleting: watcherSelectors.isDeleting(state),
});

const mapDispatchToProps = {
  onCheckWatcher: watcherActionCreators.checkWatchersRequested,
  onDeleteItem: watcherActionCreators.deleteItemPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherHistory);
