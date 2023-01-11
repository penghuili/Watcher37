import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { accountSelectors } from '../../store/account/accountSelectors';
import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import WatcherDetails from './WatcherDetails';

const mapStateToProps = state => ({
  watcher: watcherSelectors.getDetails(state),
  isLoading: watcherSelectors.isLoading(state),
  isChecking: watcherSelectors.isChecking(state),
  telegramId: accountSelectors.getAccount(state).telegramId,
  isLoadingAccount: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchWatcher: watcherActionCreators.fetchWatcherRequested,
  onCheckWatcher: watcherActionCreators.checkWatchersRequested,
  onDeleteSchedule: watcherActionCreators.deleteTriggerPressed,
  onDelete: watcherActionCreators.deletePressed,
  onAddTelegramId: accountActionCreators.addTelegramIdPressed,
  onEdit: watcherActionCreators.navToEditPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherDetails);
