import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { accountSelectors } from '../../store/account/accountSelectors';
import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Watchers from './Watchers';

const mapStateToProps = state => ({
  watchers: watcherSelectors.getWatchers(state),
  isAccountValid: accountSelectors.isAccountValid(state),
  tried: accountSelectors.tried(state),
  isLoadingSettings: accountSelectors.isLoadingSettings(state),
  isLoading: watcherSelectors.isLoading(state),
  isChecking: watcherSelectors.isChecking(state),
});

const mapDispatchToProps = {
  onFetch: watcherActionCreators.fetchWatchersRequested,
  onCheckWatcher: watcherActionCreators.checkWatchersRequested,
  onTry: accountActionCreators.tryPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchers);
