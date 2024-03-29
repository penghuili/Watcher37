import { connect } from 'react-redux';
import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherDetails from './WatcherDetails';

const mapStateToProps = state => ({
  watcher: watcherSelectors.getDetails(state),
  fetchError: watcherSelectors.getFetchError(state),
  canEdit: watcherSelectors.isOwner(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchWatcher: watcherActionCreators.fetchWatcherRequested,
  onClearFetchError: () => watcherActionCreators.setFetchError(null),
  onDelete: watcherActionCreators.deletePressed,
  onNav: sharedActionCreators.navigate,
  onEncrypt: watcherActionCreators.encryptPressed,
  onDecrypt: watcherActionCreators.decryptPressed,
  onPublic: watcherActionCreators.publicPressed,
  onPrivate: watcherActionCreators.privatePressed,
  onCreate: watcherActionCreators.createPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherDetails);
