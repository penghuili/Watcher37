import { connect } from 'react-redux';
import { accountSelectors } from '../../../../store/account/accountSelectors';

import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import WatcherTelegram from './WatcherTelegram';

const mapStateToProps = (state) => ({
  accountTelegramId: accountSelectors.getAccount(state).telegramId,
  isLoadingAccount: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onEdit: watcherActionCreators.editPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatcherTelegram);
