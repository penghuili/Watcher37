import { connect } from 'react-redux';

import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherDetails from './WatcherDetails';

const mapStateToProps = state => ({
  watcher: watcherSelectors.getDetails(state),
  fetchError: watcherSelectors.getFetchError(state),
  isOwner: watcherSelectors.isOwner(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchWatcher: watcherActionCreators.fetchWatcherRequested,
  onDelete: watcherActionCreators.deletePressed,
  onNavToEdit: watcherActionCreators.navToEditPressed,
  onEncrypt: watcherActionCreators.encryptPressed,
  onDecrypt: watcherActionCreators.decryptPressed,
  onPublic: watcherActionCreators.publicPressed,
  onPrivate: watcherActionCreators.privatePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherDetails);
