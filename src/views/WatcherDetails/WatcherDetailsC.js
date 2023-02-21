import { connect } from 'react-redux';

import { accountSelectors } from '../../store/account/accountSelectors';
import { appActionCreators } from '../../store/app/appActions';
import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherDetails from './WatcherDetails';

const mapStateToProps = state => ({
  watcher: watcherSelectors.getDetails(state),
  fetchError: watcherSelectors.getFetchError(state),
  canEdit: watcherSelectors.isOwner(state) && accountSelectors.isAccountValid(state),
  isLoading: watcherSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchWatcher: watcherActionCreators.fetchWatcherRequested,
  onDelete: watcherActionCreators.deletePressed,
  onNav: appActionCreators.navigate,
  onEncrypt: watcherActionCreators.encryptPressed,
  onDecrypt: watcherActionCreators.decryptPressed,
  onPublic: watcherActionCreators.publicPressed,
  onPrivate: watcherActionCreators.privatePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherDetails);
