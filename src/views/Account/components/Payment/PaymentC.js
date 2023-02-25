import { connect } from 'react-redux';

import { sharedActionCreators } from '../../../../shared/react/store/sharedActions';
import { watcherActionCreators } from '../../../../store/watcher/watcherActions';
import { watcherSelectors } from '../../../../store/watcher/watcherSelectors';
import Payment from './Payment';

const mapStateToProps = state => ({
  expiresAt: watcherSelectors.getExpiresAt(state),
  tried: watcherSelectors.tried(state),
  isAccountValid: watcherSelectors.isAccountValid(state),
  isLoading: watcherSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onTry: watcherActionCreators.tryPressed,
  onNavigate: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
