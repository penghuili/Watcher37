import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Watchers from './Watchers';

const mapStateToProps = state => ({
  watchers: watcherSelectors.getWatchers(state),
  isAccountValid: watcherSelectors.isAccountValid(state),
  tried: watcherSelectors.tried(state),
  isLoadingSettings: watcherSelectors.isLoadingSettings(state),
  isLoading: watcherSelectors.isLoading(state),
  isChecking: watcherSelectors.isChecking(state),
});

const mapDispatchToProps = {
  onFetch: watcherActionCreators.fetchWatchersRequested,
  onCheckWatcher: watcherActionCreators.checkWatchersRequested,
  onTry: watcherActionCreators.tryPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchers);
