import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Watchers from './Watchers';

const mapStateToProps = state => ({
  watchers: watcherSelectors.getWatchers(state),
  isLoading: watcherSelectors.isLoading(state),
  isChecking: watcherSelectors.isChecking(state),
  isAccountValid: sharedSelectors.isAccountValid(state),
  tried: sharedSelectors.tried(state),
  isLoadingSettings: sharedSelectors.isLoadingSettings(state),
  isTrying: sharedSelectors.isTrying(state),
});

const mapDispatchToProps = {
  onFetch: watcherActionCreators.fetchWatchersRequested,
  onCheckWatcher: watcherActionCreators.checkWatchersRequested,
  onTry: sharedActionCreators.tryPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchers);
