import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import ChangePassword from './ChangePassword';

const mapStateToProps = state => ({
  telegramId: watcherSelectors.getTelegramId(state),
  isLoading: watcherSelectors.isLoadingSettings(state) || sharedSelectors.isLoadingAccount(state),
});

const mapDispatchToProps = {
  onChange: sharedActionCreators.changePasswordPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
