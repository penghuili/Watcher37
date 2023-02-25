import { connect } from 'react-redux';

import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { watcherActionCreators } from '../../store/watcher/watcherActions';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import IntegrateTelegram from './IntegrateTelegram';

const mapStateToProps = state => ({
  telegramId: watcherSelectors.getTelegramId(state),
  isLoading: watcherSelectors.isLoadingSettings(state) || sharedSelectors.isLoadingAccount(state),
});

const mapDispatchToProps = {
  onAddTelegramId: watcherActionCreators.addTelegramIdPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntegrateTelegram);
