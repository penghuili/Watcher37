import { connect } from 'react-redux';

import { accountSelectors } from '../../../../store/account/accountSelectors';
import { appActionCreators } from '../../../../store/app/appActions';
import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import WatcherTelegram from './WatcherTelegram';

const mapStateToProps = state => ({
  accountTelegramId: accountSelectors.getAccount(state).telegramId,
  isLoadingAccount: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onEdit: watcherActionCreators.editPressed,
  onNavigate: appActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherTelegram);
