import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherEdit from './WatcherEdit';

const mapStateToProps = (state, { params: { id } }) => ({
  id,
  watcher: watcherSelectors.getWatcher(state, id),
  pageContent: watcherSelectors.getContent(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onEdit: watcherActionCreators.editPressed,
  onFetchContent: watcherActionCreators.fetchContentPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherEdit);
