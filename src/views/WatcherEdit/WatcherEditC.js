import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherEdit from './WatcherEdit';

const mapStateToProps = (state, { params: { id } }) => ({
  id,
  watcher: watcherSelectors.getDetails(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetch: watcherActionCreators.fetchWatcherRequested,
  onEdit: watcherActionCreators.editPressed,
  onClearContent: () => watcherActionCreators.setContent(null, null),
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherEdit);
