import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherDetails from './WatcherDetails';

const mapStateToProps = state => ({
  watcher: watcherSelectors.getDetails(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onEnter: watcherActionCreators.fetchWatcherRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherDetails);
