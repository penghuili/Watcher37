import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Watchers from './Watchers';

const mapStateToProps = state => ({
  watchers: watcherSelectors.getWatchers(state),
  isLoading: watcherSelectors.isLoading(state),
  isChecking: watcherSelectors.isChecking(state),
});

const mapDispatchToProps = {
  onFetch: watcherActionCreators.fetchWatchersRequested,
  onCheckWatcher: watcherActionCreators.checkWatchersRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchers);
