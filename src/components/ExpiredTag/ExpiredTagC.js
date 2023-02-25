import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { watcherSelectors } from '../../store/watcher/watcherSelectors';
import ExpiredTag from './ExpiredTag';

const mapStateToProps = state => ({
  isLoggedIn: sharedSelectors.isLoggedIn(state),
  isAccountValid: watcherSelectors.isAccountValid(state),
  expiresAt: watcherSelectors.getExpiresAt(state),
});

const mapDispatchToProps = {
  onBack: sharedActionCreators.goBack,
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredTag);
