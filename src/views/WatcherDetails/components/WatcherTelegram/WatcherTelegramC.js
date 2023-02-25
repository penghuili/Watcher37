import { connect } from 'react-redux';

import { sharedActionCreators } from '../../../../shared/react/store/sharedActions';
import sharedSelectors from '../../../../shared/react/store/sharedSelectors';
import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import { watcherSelectors } from '../../../../store/watcher/watcherSelectors';
import WatcherTelegram from './WatcherTelegram';

const mapStateToProps = state => ({
  accountTelegramId: watcherSelectors.getTelegramId(state),
  isLoadingAccount: sharedSelectors.isLoadingAccount(state),
});

const mapDispatchToProps = {
  onEdit: watcherActionCreators.editPressed,
  onNavigate: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherTelegram);
