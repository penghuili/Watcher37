import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import Watchers from './Watchers';

const mapStateToProps = state => ({
  watchers: watcherSelectors.getWatchers(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onEnter: watcherActionCreators.fetchWatchersRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchers);
