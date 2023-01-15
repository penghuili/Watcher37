import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import IntegrateTelegramChannel from './IntegrateTelegramChannel';

const mapStateToProps = (state, { params: { id } }) => ({
  id,
  watcher: watcherSelectors.getWatcher(state, id),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetch: watcherActionCreators.fetchWatchersRequested,
  onEdit: watcherActionCreators.editPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntegrateTelegramChannel);
